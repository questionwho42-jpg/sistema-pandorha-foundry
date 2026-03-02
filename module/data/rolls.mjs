import {
  applyConditions,
  applyNumericEffects,
  findConditions,
  extractConditionDurations,
  extractNumericEffects,
} from "./conditions.mjs";
import { getActorAutomation, getItemAutomation } from "./automation.mjs";

export async function rollTest({
  actor,
  eixo,
  aplicacao,
  bonus = 0,
  label = "Teste",
  trained = true,
  mapStep = 0,
  agile = false,
} = {}) {
  if (!actor) return null;

  const automation = getActorAutomation(actor);
  const untrainedPenalty = trained ? 0 : -4;
  const mapPenalty = getMapPenalty(mapStep, agile);

  const data = {
    level: actor.system.attributes.level ?? 0,
    eixo: actor.system.eixos?.[eixo] ?? 0,
    aplicacao: actor.system.aplicacoes?.[aplicacao] ?? 0,
    bonusBase: (bonus ?? 0) + untrainedPenalty + (automation.testBonus ?? 0),
    mapPenalty: mapPenalty,
  };

  const formulaParts = ["1d20", "@level", "@eixo", "@aplicacao"];
  if (data.bonusBase !== 0) formulaParts.push("@bonusBase");
  if (data.mapPenalty !== 0) formulaParts.push("@mapPenalty");

  const formula = formulaParts.join(" + ");
  const roll = await new Roll(formula, data).evaluate({ async: true });
  const flavor = `${label}: ${eixo ?? ""} + ${aplicacao ?? ""}`.trim();

  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor,
  });

  return roll;
}

export async function rollFormula({ actor, formula, label = "Rolagem" } = {}) {
  if (!formula) return null;
  const roll = await new Roll(formula, actor?.getRollData?.() ?? {}).evaluate({
    async: true,
  });
  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: label,
  });
  return roll;
}

export async function rollSkill({
  actor,
  skill,
  label = "Perícia",
  mapStep = 0,
} = {}) {
  if (!actor || !skill) return null;
  const trained = actor.system.skills?.[skill.id]?.trained ?? false;
  const bonus = actor.system.skills?.[skill.id]?.bonus ?? 0;

  return rollTest({
    actor,
    eixo: skill.eixo,
    aplicacao: skill.aplicacao,
    bonus,
    trained,
    mapStep,
    label: `${label}: ${skill.label}`,
  });
}

export async function rollItem({ actor, item, mapStep = 0 } = {}) {
  if (!actor || !item) return null;
  const system = item.system ?? {};
  await postItemDescription({ actor, item, header: "Descricao da Acao" });
  const axis = system.roll?.axis || system.rollAxis || "fisico";
  const aplicacao =
    system.roll?.aplicacao || system.rollAplicacao || "conflito";
  const bonusBase = Number(system.roll?.bonus ?? system.rollBonus ?? 0) || 0;
  const attackBonus = actor.system.bonuses?.attack ?? 0;
  const bonus = bonusBase + (system.roll?.isAttack ? attackBonus : 0);
  const isAttack =
    system.roll?.isAttack ??
    ["weapon", "maneuver", "spell"].includes(item.type);
  const isAgile = (system.weapon?.tags ?? []).some((t) =>
    t.toLowerCase().includes("ágil"),
  );
  const autoMap = mapStep === "auto";
  const resolvedMap = autoMap ? getMapFromActor(actor, isAttack) : mapStep;

  const roll = await rollTest({
    actor,
    eixo: axis,
    aplicacao,
    bonus,
    trained: true,
    mapStep: resolvedMap,
    agile: isAgile,
    label: item.name,
  });

  if (autoMap && isAttack) incrementActorMap(actor);

  const text = `${system.effect ?? ""} ${system.description ?? ""}`;
  const defaultConditions = findConditions(text);
  const defaultDurations = extractConditionDurations(text);
  const defaultEffects = extractNumericEffects(text);
  const partialText = extractPartialSection(text);
  const partialConditions = findConditions(partialText);
  const partialDurations = extractConditionDurations(partialText);
  const partialEffects = extractNumericEffects(partialText);
  const criticalText = extractCriticalSection(text);
  const criticalConditions = findConditions(criticalText);
  const criticalDurations = extractConditionDurations(criticalText);
  const criticalEffects = extractNumericEffects(criticalText);
  const targets = Array.from(game.user?.targets ?? []);

  if (targets.length) {
    for (const target of targets) {
      const targetActor = target.actor ?? target;
      if (!targetActor) continue;
      const dc = isAttack
        ? (targetActor.system?.defenses?.ca ?? 10)
        : Number(system.dc ?? 0);
      const degree = evaluateDegree(roll.total, dc);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `<p><strong>${item.name}</strong> contra ${targetActor.name}: ${degree.label}</p>`,
      });

      if (degree.success && (system.damage || system.weapon?.damage)) {
        await rollItemDamage({
          actor,
          item,
          label: degree.critical ? "Dano Crítico" : "Dano",
          critical: degree.critical,
        });
      }

      if (!degree.success) continue;

      if (degree.label === "Sucesso com Custo") {
        if (partialConditions.length)
          await applyConditions([target], partialConditions, partialDurations);
        if (partialEffects.length)
          await applyNumericEffects([target], partialEffects, {});
        continue;
      }

      if (degree.critical) {
        if (criticalConditions.length)
          await applyConditions(
            [target],
            criticalConditions,
            criticalDurations,
          );
        if (criticalEffects.length)
          await applyNumericEffects([target], criticalEffects, {});
        else if (defaultEffects.length)
          await applyNumericEffects([target], defaultEffects, {});
        if (!criticalConditions.length && defaultConditions.length)
          await applyConditions([target], defaultConditions, defaultDurations);
        continue;
      }

      if (defaultConditions.length)
        await applyConditions([target], defaultConditions, defaultDurations);
      if (defaultEffects.length)
        await applyNumericEffects([target], defaultEffects, {});
    }
  } else if (!isAttack) {
    if (defaultConditions.length)
      await applyConditions([actor], defaultConditions, defaultDurations);
    if (defaultEffects.length)
      await applyNumericEffects([actor], defaultEffects, {});
    if (!system.dc) return roll;

    const dc = Number(system.dc ?? 0);
    const degree = evaluateDegree(roll.total, dc);
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<p><strong>${item.name}</strong> vs DC ${dc}: ${degree.label}</p>`,
    });
  }

  return roll;
}

export async function postItemDescription({
  actor,
  item,
  header = "Descricao",
} = {}) {
  if (!actor || !item) return null;

  const description = getItemDescriptionHTML(item);
  if (!description) {
    ui.notifications?.warn(
      `"${item.name}" nao possui descricao para enviar ao chat.`,
    );
    return null;
  }

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `<article class="pandorha-chat-card"><h3>${escapeHTML(item.name)}</h3><h4>${escapeHTML(header)}</h4>${description}</article>`,
  });
}

export async function rollItemDamage({
  actor,
  item,
  label = "Dano",
  critical = false,
} = {}) {
  if (!item) return null;
  const system = item.system ?? {};
  const damage = system.damage || system.weapon?.damage || "";
  if (!damage) return null;

  // Regra de Pandorha: Conflito contribui para dano.
  const conflitoDamageBonus =
    Number(actor?.system?.aplicacoes?.conflito ?? 0) || 0;
  const actorDamageBonus = Number(actor?.system?.bonuses?.damage ?? 0) || 0;
  // Se o item nao esta equipado, o bonus dele nao entra na automacao do ator.
  // Nesse caso, aplicamos o bonus de dano extraido do proprio item.
  const itemDamageBonus = item.system?.equipped
    ? 0
    : Number(
        getItemAutomation(item, { ignoreActiveCheck: true }).damage ?? 0,
      ) || 0;
  const totalDamageBonus =
    conflitoDamageBonus + actorDamageBonus + itemDamageBonus;
  const baseFormula =
    damage.includes("+") || damage.includes("-") ? `(${damage})` : damage;
  const formula = critical
    ? `(${baseFormula}+${totalDamageBonus})*2`
    : `${baseFormula}+${totalDamageBonus}`;
  const roll = await new Roll(formula, actor?.getRollData?.() ?? {}).evaluate({
    async: true,
  });
  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: `${label}: ${item.name}`,
  });
  return roll;
}

export function getMapPenalty(step = 0, agile = false) {
  const mapValue = Number(step) || 0;
  if (!mapValue) return 0;
  if (mapValue === 1) return agile ? -4 : -5;
  return agile ? -8 : -10;
}

export function getMapFromActor(actor, isAttack) {
  if (!isAttack) return 0;
  if (!game.combat) return 0;
  const current = Number(actor.getFlag("pandorha", "attacksThisTurn") ?? 0);
  return Math.min(current, 2);
}

export async function incrementActorMap(actor) {
  const current = Number(actor.getFlag("pandorha", "attacksThisTurn") ?? 0);
  await actor.setFlag("pandorha", "attacksThisTurn", current + 1);
}

export function evaluateDegree(total, dc) {
  if (!dc || Number.isNaN(Number(dc)))
    return { success: true, critical: false, label: "Sucesso" };
  const diff = total - dc;
  if (diff >= 10)
    return { success: true, critical: true, label: "Sucesso Crítico" };
  if (diff >= 0) return { success: true, critical: false, label: "Sucesso" };
  if (diff >= -4)
    return { success: true, critical: false, label: "Sucesso com Custo" };
  return { success: false, critical: false, label: "Falha" };
}

function getItemDescriptionHTML(item) {
  const system = item?.system ?? {};
  const chunks = [
    system.description,
    system.effect,
    system.activation?.cost
      ? `<p><strong>Custo:</strong> ${escapeHTML(system.activation.cost)}</p>`
      : "",
    system.check
      ? `<p><strong>Teste:</strong> ${escapeHTML(system.check)}</p>`
      : "",
    system.dc
      ? `<p><strong>CD:</strong> ${escapeHTML(String(system.dc))}</p>`
      : "",
    system.damage
      ? `<p><strong>Dano:</strong> ${escapeHTML(String(system.damage))}</p>`
      : "",
  ].filter(Boolean);

  return chunks.join("");
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function extractPartialSection(text) {
  const match = text.match(/F\.\s*Parcial\s*:\s*([\s\S]*?)(?:\n\n|$)/i);
  return match ? match[1] : "";
}

function extractCriticalSection(text) {
  const match = text.match(/Cr[ií]tico\s*:\s*([\s\S]*?)(?:\n\n|$)/i);
  return match ? match[1] : "";
}
