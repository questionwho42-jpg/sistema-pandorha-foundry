import { SKILLS } from "./skills.mjs";

const ALWAYS_ACTIVE_TYPES = new Set([
  "ancestry",
  "background",
  "class",
  "talent",
  "trait",
  "feature",
  "ability",
  "condition",
  "disease",
  "toxin"
]);

const EQUIPPED_ACTIVE_TYPES = new Set([
  "weapon",
  "armor",
  "shield",
  "equipment",
  "consumable",
  "rune"
]);

const SKILL_KEYWORDS = {
  furtividade_fisica: ["furtividade fisica", "furtividade"],
  furtividade_magica: ["furtividade magica", "furtividade"],
  percepcao: ["percepcao", "perceber"],
  ladinagem: ["ladinagem", "ladino", "trapa"],
  medicina: ["medicina", "curar", "cura"],
  historia: ["historia", "arcanismo", "conhecimento"],
  atletismo: ["atletismo", "escalada", "nadar"],
  intimidacao: ["intimidacao", "intimidar"],
  persuasao: ["persuasao", "persuadir", "negociar"],
  adestramento: ["adestramento", "domar", "animais"]
};

function emptySkillAutomation() {
  return Object.fromEntries(SKILLS.map((skill) => [skill.id, { bonus: 0, trained: false }]));
}

export function createAutomationState() {
  return {
    attack: 0,
    damage: 0,
    ca: 0,
    initiative: 0,
    testBonus: 0,
    movement: 0,
    carryBonus: 0,
    carryMultiplier: 1,
    resources: {
      hp: 0,
      pv: 0,
      ee: 0
    },
    eixos: {
      fisico: 0,
      mental: 0,
      social: 0
    },
    aplicacoes: {
      conflito: 0,
      interacao: 0,
      resistencia: 0
    },
    skills: emptySkillAutomation()
  };
}

export function getActorAutomation(actor) {
  const automation = createAutomationState();
  if (!actor) return automation;

  for (const item of actor.items ?? []) {
    if (!isItemActiveForAutomation(item)) continue;
    const itemAutomation = parseItemAutomation(item);
    mergeAutomation(automation, itemAutomation);
  }

  return automation;
}

export function getDerivedEffectBonuses(actor) {
  const bonuses = {
    ca: 0,
    initiative: 0,
    resources: { hp: 0, pv: 0, ee: 0 }
  };

  for (const effect of actor?.effects ?? []) {
    if (!effect || effect.disabled) continue;
    for (const change of effect.changes ?? []) {
      const value = parseSigned(change?.value);
      if (!Number.isFinite(value)) continue;

      switch (String(change.key ?? "")) {
        case "system.defenses.ca":
          bonuses.ca += value;
          break;
        case "system.derived.initiative":
          bonuses.initiative += value;
          break;
        case "system.resources.hp.max":
          bonuses.resources.hp += value;
          break;
        case "system.resources.pv.max":
          bonuses.resources.pv += value;
          break;
        case "system.resources.ee.max":
          bonuses.resources.ee += value;
          break;
        default:
          break;
      }
    }
  }

  return bonuses;
}

export function formatSigned(value) {
  const number = Number(value) || 0;
  return number >= 0 ? `+${number}` : String(number);
}

function isItemActiveForAutomation(item) {
  if (!item) return false;
  if (ALWAYS_ACTIVE_TYPES.has(item.type)) return true;
  if (EQUIPPED_ACTIVE_TYPES.has(item.type)) return Boolean(item.system?.equipped);
  return false;
}

function parseItemAutomation(item) {
  const result = createAutomationState();
  const text = normalizeText(
    toPlainText([
      item?.system?.effect,
      item?.system?.description,
      item?.system?.rune?.effects,
      item?.system?.details?.requirements
    ].filter(Boolean).join("\n"))
  );

  if (!text) return result;

  result.attack += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:de\s*)?(?:ataque|acerto)\b/gi,
    /\b(?:ataque|acerto)\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);

  result.damage += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:de\s*)?dano\b/gi,
    /\bdano\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);

  result.ca += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:de\s*)?ca\b/gi,
    /\bca\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);

  result.initiative += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:de\s*)?iniciativa\b/gi,
    /\biniciativa\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);

  result.movement += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:m|metros?)\s*(?:de\s*)?(?:movimento|deslocamento|velocidade)\b/gi,
    /(?:movimento|deslocamento|velocidade)[^+\-\n]{0,16}([+\-]\s*\d+)\s*(?:m|metros?)?/gi
  ]);

  result.testBonus += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:de\s*)?(?:bonus|penalidade)?\s*em\s*testes?\b/gi,
    /\btestes?\b[^+\-\n]{0,24}([+\-]\s*\d+)/gi
  ]);

  result.resources.hp += collectSigned(text, [
    /([+\-]\s*\d+)\s*(?:hp|vida)\s*(?:max(?:imo|ima)?)\b/gi,
    /(?:hp|vida)\s*(?:max(?:imo|ima)?)\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);
  result.resources.pv += collectSigned(text, [
    /([+\-]\s*\d+)\s*pv\s*(?:max(?:imo|ima)?)\b/gi,
    /\bpv\s*(?:max(?:imo|ima)?)\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);
  result.resources.ee += collectSigned(text, [
    /([+\-]\s*\d+)\s*ee\s*(?:max(?:imo|ima)?)\b/gi,
    /\bee\s*(?:max(?:imo|ima)?)\b[^+\-\n]{0,16}([+\-]\s*\d+)/gi
  ]);

  applyPoolBonus(text, result.eixos, "fisico");
  applyPoolBonus(text, result.eixos, "mental");
  applyPoolBonus(text, result.eixos, "social");
  applyPoolBonus(text, result.aplicacoes, "conflito");
  applyPoolBonus(text, result.aplicacoes, "interacao");
  applyPoolBonus(text, result.aplicacoes, "resistencia");

  applySkillBonuses(text, result.skills);
  applySkillTraining(text, result.skills);
  applyCarryRules(text, result);

  return result;
}

function applyPoolBonus(text, pool, key) {
  pool[key] += collectSigned(text, [
    new RegExp(`([+\\-]\\s*\\d+)\\s*${key}\\b`, "gi"),
    new RegExp(`\\b${key}\\b[^+\\-\\n]{0,16}([+\\-]\\s*\\d+)`, "gi")
  ]);
}

function applySkillBonuses(text, skills) {
  for (const [skillId, keywords] of Object.entries(SKILL_KEYWORDS)) {
    for (const keyword of keywords) {
      const escaped = escapeRegex(keyword);
      const total = collectSigned(text, [
        new RegExp(`([+\\-]\\s*\\d+)[^\\n]{0,28}\\b${escaped}\\b`, "gi"),
        new RegExp(`\\b${escaped}\\b[^+\\-\\n]{0,28}([+\\-]\\s*\\d+)`, "gi")
      ]);
      if (total) skills[skillId].bonus += total;
    }
  }
}

function applySkillTraining(text, skills) {
  if (!/(treinad[oa]|treinamento)/i.test(text)) return;

  for (const [skillId, keywords] of Object.entries(SKILL_KEYWORDS)) {
    for (const keyword of keywords) {
      const escaped = escapeRegex(keyword);
      const trainedRegex = new RegExp(`(?:treinad[oa]|treinamento)[^\\n]{0,32}\\b${escaped}\\b|\\b${escaped}\\b[^\\n]{0,32}(?:treinad[oa]|treinamento)`, "i");
      if (trainedRegex.test(text)) {
        skills[skillId].trained = true;
        break;
      }
    }
  }
}

function applyCarryRules(text, automation) {
  if (/(dobra|dobro)[^\\n]{0,24}(peso|carga|capacidade|slots?)/i.test(text)) {
    automation.carryMultiplier *= 2;
  }

  const slotRegex = /([+\-]\s*\d+)\s*slots?/gi;
  let match;
  while ((match = slotRegex.exec(text))) {
    const value = parseSigned(match[1]);
    if (!Number.isFinite(value)) continue;
    const start = Math.max(0, match.index - 24);
    const end = Math.min(text.length, match.index + 42);
    const context = text.slice(start, end);
    if (/(carga|capacidade|carrega|limite)/i.test(context)) {
      automation.carryBonus += value;
    }
  }
}

function mergeAutomation(target, source) {
  target.attack += source.attack;
  target.damage += source.damage;
  target.ca += source.ca;
  target.initiative += source.initiative;
  target.testBonus += source.testBonus;
  target.movement += source.movement;
  target.carryBonus += source.carryBonus;
  target.carryMultiplier *= source.carryMultiplier;
  target.resources.hp += source.resources.hp;
  target.resources.pv += source.resources.pv;
  target.resources.ee += source.resources.ee;
  target.eixos.fisico += source.eixos.fisico;
  target.eixos.mental += source.eixos.mental;
  target.eixos.social += source.eixos.social;
  target.aplicacoes.conflito += source.aplicacoes.conflito;
  target.aplicacoes.interacao += source.aplicacoes.interacao;
  target.aplicacoes.resistencia += source.aplicacoes.resistencia;

  for (const skill of SKILLS) {
    target.skills[skill.id].bonus += source.skills[skill.id].bonus;
    target.skills[skill.id].trained = target.skills[skill.id].trained || source.skills[skill.id].trained;
  }
}

function collectSigned(text, patterns) {
  let total = 0;
  for (const pattern of patterns) {
    const regex = toGlobalRegex(pattern);
    let match;
    while ((match = regex.exec(text))) {
      const value = parseSigned(match[match.length - 1]);
      if (Number.isFinite(value)) total += value;
    }
  }
  return total;
}

function toGlobalRegex(pattern) {
  if (pattern instanceof RegExp) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    return new RegExp(pattern.source, flags);
  }
  return new RegExp(String(pattern), "gi");
}

function parseSigned(raw) {
  if (raw === null || raw === undefined) return Number.NaN;
  const value = Number(String(raw).replace(/\s+/g, "").replace(",", "."));
  return Number.isFinite(value) ? value : Number.NaN;
}

function toPlainText(input) {
  return String(input ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\r/g, "\n");
}

function normalizeText(input) {
  return String(input ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
