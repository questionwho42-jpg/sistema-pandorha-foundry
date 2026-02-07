export const CONDITIONS = [
  "Abalado",
  "Agarrado",
  "Aterrorizado",
  "Atordoado",
  "Caído",
  "Cego",
  "Combalido",
  "Confuso",
  "Dormindo",
  "Em Chamas",
  "Energizado",
  "Enfeitiçado",
  "Envenenado",
  "Exausto",
  "Exposto",
  "Focado",
  "Gelado",
  "Imobilizado",
  "Incapacitado",
  "Inconsciente",
  "Invisível",
  "Lento",
  "Maldito",
  "Marcado",
  "Moribundo",
  "Nauseado",
  "Oculto",
  "Paralisado",
  "Petrificado",
  "Sangrando",
  "Sem Ar",
  "Surdo",
  "Surpreendido",
  "Vulnerável"
];

const DEFAULT_DURATIONS = {
  "Abalado": { rounds: 10 },
  "Atordoado": { rounds: 1 },
  "Confuso": { rounds: 1 },
  "Exposto": { rounds: 1 },
  "Gelado": { rounds: 1 },
  "Lento": { rounds: 1 },
  "Surpreendido": { rounds: 1 }
};

export function findConditions(text = "") {
  const hits = [];
  for (const name of CONDITIONS) {
    const pattern = new RegExp(`\\b${escapeRegex(name)}\\b`, "i");
    if (pattern.test(text)) hits.push(name);
  }
  return hits;
}

export function extractConditionDurations(text = "") {
  const durations = {};
  for (const name of CONDITIONS) {
    const patternRound = new RegExp(`${escapeRegex(name)}[^\\n]*?(\\d+)\\s*R`, "i");
    const roundMatch = text.match(patternRound);
    if (roundMatch) durations[name] = { rounds: Number(roundMatch[1]) };

    const patternTurno = new RegExp(`${escapeRegex(name)}[^\\n]*?(\\d+)\\s*turno`, "i");
    const turnMatch = text.match(patternTurno);
    if (turnMatch) durations[name] = { rounds: Number(turnMatch[1]) };

    const patternRodada = new RegExp(`${escapeRegex(name)}[^\\n]*?(\\d+)\\s*rodada`, "i");
    const rodadaMatch = text.match(patternRodada);
    if (rodadaMatch) durations[name] = { rounds: Number(rodadaMatch[1]) };

    const minutePattern = new RegExp(`${escapeRegex(name)}[^\\n]*?(\\d+)\\s*min`, "i");
    const minMatch = text.match(minutePattern);
    if (minMatch) durations[name] = { seconds: Number(minMatch[1]) * 60 };

    const hourPattern = new RegExp(`${escapeRegex(name)}[^\\n]*?(\\d+)\\s*h`, "i");
    const hourMatch = text.match(hourPattern);
    if (hourMatch) durations[name] = { seconds: Number(hourMatch[1]) * 3600 };
  }
  return durations;
}

export function getDefaultDuration(name) {
  return DEFAULT_DURATIONS[name] ?? null;
}

export function extractNumericEffects(text = "") {
  const changes = [];

  const caMatch = text.match(/CA\s*([+\-]\s*\d+)/i) || text.match(/([+\-]\s*\d+)\s*CA/i);
  if (caMatch) {
    const value = Number(caMatch[1].replace(/\s+/g, ""));
    if (!Number.isNaN(value)) changes.push({ key: "system.defenses.ca", mode: 2, value });
  }

  const initMatch = text.match(/Iniciativa\s*([+\-]\s*\d+)/i) || text.match(/([+\-]\s*\d+)\s*Iniciativa/i);
  if (initMatch) {
    const value = Number(initMatch[1].replace(/\s+/g, ""));
    if (!Number.isNaN(value)) changes.push({ key: "system.derived.initiative", mode: 2, value });
  }

  const movMatch = text.match(/(Movimento|Velocidade)[^0-9+\-]*([+\-]\s*\d+)\s*m/i) || text.match(/([+\-]\s*\d+)\s*m\s*Mov/i);
  if (movMatch) {
    const value = Number(movMatch[2]?.replace(/\s+/g, "") ?? movMatch[1]?.replace(/\s+/g, ""));
    if (!Number.isNaN(value)) changes.push({ key: "system.movement.base", mode: 2, value });
  }

  const attackMatch = text.match(/Ataque\s*([+\-]\s*\d+)/i) || text.match(/([+\-]\s*\d+)\s*Ataque/i) || text.match(/Acerto\s*([+\-]\s*\d+)/i);
  if (attackMatch) {
    const value = Number(attackMatch[1].replace(/\s+/g, ""));
    if (!Number.isNaN(value)) changes.push({ key: "system.bonuses.attack", mode: 2, value });
  }

  const damageMatch = text.match(/Dano\s*([+\-]\s*\d+)/i) || text.match(/([+\-]\s*\d+)\s*Dano/i);
  if (damageMatch) {
    const value = Number(damageMatch[1].replace(/\s+/g, ""));
    if (!Number.isNaN(value)) changes.push({ key: "system.bonuses.damage", mode: 2, value });
  }

  return changes;
}

export async function applyConditions(targets, conditionNames, durations = {}) {
  if (!targets?.length || !conditionNames?.length) return;

  for (const target of targets) {
    const actor = target.actor ?? target;
    if (!actor) continue;

    for (const name of conditionNames) {
      const duration = durations[name] ?? getDefaultDuration(name) ?? {};
      await actor.createEmbeddedDocuments("ActiveEffect", [
        {
          name,
          icon: "icons/svg/terror.svg",
          duration,
          flags: { pandorha: { condition: name } }
        }
      ]);
    }
  }
}

export async function applyNumericEffects(targets, changes, duration = {}) {
  if (!targets?.length || !changes?.length) return;

  for (const target of targets) {
    const actor = target.actor ?? target;
    if (!actor) continue;

    await actor.createEmbeddedDocuments("ActiveEffect", [
      {
        name: "Efeito Pandorha",
        icon: "icons/svg/aura.svg",
        duration,
        changes,
        flags: { pandorha: { numeric: true } }
      }
    ]);
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
