/**
 * -------------------------------------------------------------
 * Módulo de Integração Pandorha System <-> Monk's Token Bar
 * 1. DECORATORS: O "EFEITO CEBOLA" PARA ROLAGENS DINÂMICAS
 * -------------------------------------------------------------
 */

// Interface/Componente Abstrato
class IPandorhaRoll {
  getBonus(actor) {
    return 0;
  }
  getName() {
    return "";
  }
}

// Componente Concreto (Rolagem Inicial / Teste Puro)
class RolagemVazia extends IPandorhaRoll {
  getBonus(actor) {
    return 0;
  }
  getName() {
    return "Teste Dinâmico";
  }
}

// Decorador Base
class RollDecorator extends IPandorhaRoll {
  constructor(wrapper) {
    super();
    this.wrapper = wrapper;
  }
  getBonus(actor) {
    return this.wrapper.getBonus(actor);
  }
  getName() {
    return this.wrapper.getName();
  }
}

// Decorador Concreto (Para Eixo ou Aplicação)
class ComAtributo extends RollDecorator {
  constructor(wrapper, atributoNome) {
    super(wrapper);
    this.atributoNome = atributoNome;
  }
  getBonus(actor) {
    let base = super.getBonus(actor);
    // Resgata o valor numérico do atributo na ficha do Pandorha
    let statBonus = actor.system[this.atributoNome]?.value || 0;
    return base + statBonus;
  }
  getName() {
    let n =
      this.atributoNome.charAt(0).toUpperCase() + this.atributoNome.slice(1);
    let baseName = super.getName();
    return baseName === "Teste Dinâmico" ? n : baseName + " + " + n;
  }
}

// Decorador Concreto (Para Modificadores Fixos Numéricos)
class ComBonusFixo extends RollDecorator {
  constructor(wrapper, valor) {
    super(wrapper);
    this.valor = parseInt(valor) || 0;
  }
  getBonus(actor) {
    return super.getBonus(actor) + this.valor;
  }
  getName() {
    if (this.valor === 0) return super.getName();
    let sinal = this.valor > 0 ? "+" : "";
    return super.getName() + ` (${sinal}${this.valor})`;
  }
}

/**
 * -------------------------------------------------------------
 * 2. REGISTRANDO NO MONK'S TOKEN BAR VIA HOOK E IMPORT DINÂMICO
 * -------------------------------------------------------------
 */
Hooks.once("ready", async () => {
  if (game.modules.get("monks-tokenbar")?.active) {
    try {
      // Importar a classe base do módulo apenas se ele existir
      const { BaseRolls } =
        await import("/modules/monks-tokenbar/systems/base-rolls.js");
      const { MonksTokenBar } =
        await import("/modules/monks-tokenbar/monks-tokenbar.js");

      class PandorhaRolls extends BaseRolls {
        constructor() {
          super();
          // Limpamos o Array base, pois usaremos a macro do GM.
          this._requestoptions = [];
        }

        // Avisamos ao módulo que nós daremos conta das rolagens
        get _supportedSystem() {
          return true;
        }

        // Função disparada quando JOGADOR clica no chat para rolar o teste solicitado
        roll(data, callback, e) {
          let actor = data.actor;
          let message = data.message;

          // 1. Resgatamos as opções dinâmicas guardadas pela Macro do Mestre
          let opts = message.getFlag("monks-tokenbar", "options") || {};

          // 2. Composição de Decorators (Hambúrguer de modificadores camada a camada)
          let rollComponent = new RolagemVazia();

          if (opts.custom_eixo) {
            rollComponent = new ComAtributo(rollComponent, opts.custom_eixo);
          }
          if (opts.custom_aplicacao) {
            rollComponent = new ComAtributo(
              rollComponent,
              opts.custom_aplicacao,
            );
          }
          if (opts.custom_bonus !== undefined && opts.custom_bonus !== 0) {
            rollComponent = new ComBonusFixo(rollComponent, opts.custom_bonus);
          }

          // 3. Extraímos o Somatório Total via "Efeito Cebola" chamando o Decorador mais externo
          let bonusTotal = rollComponent.getBonus(actor);
          let formula = `1d20 + ${bonusTotal}`;
          let titulo = rollComponent.getName();

          console.log(
            `Pandorha | Rolando Monks Token Bar -> ${titulo} (Fórmula: ${formula})`,
          );

          // 4. Constrói a Foundry Entity Roll assíncrona
          let r = new Roll(formula, actor.getRollData());
          return r.evaluate({ async: true }).then((roll) => {
            return callback(roll); // Devolve a rolagem pro log de combate/chat nativo
          });
        }
      }

      // Injeta nossa classe configurada no motor do módulo
      MonksTokenBar.system = new PandorhaRolls();
      console.log(
        "Pandorha System | Monk's Token Bar API Substituída via Decorators!",
      );
    } catch (err) {
      console.error(
        "Pandorha System | Falha na associação do motor de regras ao Monk's Token Bar:",
        err,
      );
    }
  }
});
