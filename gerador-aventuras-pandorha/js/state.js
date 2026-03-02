/**
 * STATE.JS — Gestão de Estado Centralizada
 * Forja de Aventuras | Sistema Pandorha
 */

const ForjaState = (() => {
  /** @type {Object} Estado inicial da aplicação */
  const _defaultState = {
    etapaAtual: 1,
    totalEtapas: 8,
    wizard: {
      cenario: "",
      tier: "",
      jogadores: "",
      dificuldade: "",
      tons: [],
      conflito: "",
      vilao: "",
      duracao: "",
      estrutura: "3cenas",
      regraCasa: true,
      downtime: true,
      downtimeMecanico: false,
      progressaoXP: false,
      nomeAventura: "",
    },
    aventuraGerada: null,
    viewAtual: "wizard",
    undoStack: [],
  };

  let _state = JSON.parse(JSON.stringify(_defaultState));
  const _listeners = [];

  /**
   * Retorna o estado completo ou uma chave específica.
   * @param {string} [key] - Chave do estado
   * @returns {*}
   */
  function getState(key) {
    if (key) {
      const keys = key.split(".");
      let val = _state;
      for (const k of keys) {
        if (val === undefined) return undefined;
        val = val[k];
      }
      return val;
    }
    return JSON.parse(JSON.stringify(_state));
  }

  /**
   * Atualiza o estado e notifica listeners.
   * @param {string} key - Chave (suporta dot notation: 'wizard.cenario')
   * @param {*} value - Novo valor
   */
  function setState(key, value) {
    const keys = key.split(".");
    let obj = _state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj[keys[i]] === undefined) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    _notifyListeners(key, value);
  }

  /**
   * Registra um listener para mudanças de estado.
   * @param {Function} callback - fn(key, value)
   */
  function subscribe(callback) {
    _listeners.push(callback);
  }

  /** Reseta o estado para o padrão. */
  function reset() {
    _state = JSON.parse(JSON.stringify(_defaultState));
    _notifyListeners("reset", null);
  }

  /** @private */
  function _notifyListeners(key, value) {
    _listeners.forEach((fn) => fn(key, value));
  }

  return { getState, setState, subscribe, reset };
})();
