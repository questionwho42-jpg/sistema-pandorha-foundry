import fs from "fs";
import path from "path";

const sourceDir = "c:/Users/Pichau/Desktop/o mundo de pandorha - livro/Sistemas/Pandorha/sistema consolidado";
const outDir = "c:/Users/Pichau/Desktop/pandorha foundry/packs";

function read(file) {
  return fs.readFileSync(path.join(sourceDir, file), "utf8");
}

function ensureOutDir() {
  fs.mkdirSync(outDir, { recursive: true });
}

function randomId(length = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function toHtml(text) {
  if (!text) return "";
  const esc = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .split(/\n\s*\n/)
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function writePack(name, docs) {
  const filePath = path.join(outDir, `${name}.db`);
  const lines = docs.map(d => JSON.stringify(d));
  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  console.log(`Wrote ${docs.length} to ${filePath}`);
}

function baseItem({ name, type, description = "" }) {
  return {
    _id: randomId(),
    name,
    type,
    img: "icons/svg/book.svg",
    system: {
      description: toHtml(description),
      details: { source: "Pandorha", category: "", requirements: "", tags: [] },
      activation: { cost: "", type: "" },
      range: "",
      duration: "",
      target: "",
      check: "",
      dc: "",
      damage: "",
      effect: "",
      roll: { axis: "", aplicacao: "", bonus: 0, isAttack: false },
      components: "",
      school: "",
      circle: 0,
      level: 0,
      price: "",
      quantity: 1,
      equipped: false,
      slotCost: 0,
      weapon: { damage: "", tags: [], range: "", type: "", hands: 1 },
      armor: { bonus: 0, penalty: "", tags: [], maxAxis: 0 },
      shield: { bonus: 0, tags: [], type: "" },
      rune: { grade: "", effects: "" },
      classData: { baseHp: 0, basePv: 0, baseEe: 0, trainedWeapons: [], trainedArmors: [], trainedShields: [] }
    }
  };
}

function extractDamageFormula(text = "") {
  const match = text.match(/(\d+d\d+(?:\s*[\+\-]\s*\d+)?)/i);
  if (!match) return "";
  return match[1].replace(/\s+/g, "");
}

function extractDcValue(text = "") {
  const match = text.match(/\b(?:DC|CD)\s*([0-9]+)/i);
  return match ? Number(match[1]) : null;
}

function inferIsAttack(text = "") {
  return /\bAtaque\b/i.test(text) || /\bAtaca\b/i.test(text);
}

function parseAncestries() {
  const files = [
    "01_01_Humanos.md",
    "01_02_Elfos.md",
    "01_03_Anoes.md",
    "01_04_Drakari.md",
    "01_05_Umbrais.md",
    "01_06_Feras.md"
  ];

  const ancestries = [];
  const traits = [];

  for (const file of files) {
    const text = read(file);
    const titleMatch = text.match(/##\s+\d+\.\s+([^\n]+)/);
    const name = titleMatch ? titleMatch[1].trim() : file.replace(/\..+$/, "");

    const ancestryItem = baseItem({ name, type: "ancestry", description: text });
    ancestries.push(ancestryItem);

    const traitMatches = [...text.matchAll(/^\s*\d+\.\s+(?:\*\*)?(.+?)(?:\*\*)?\:\s*(.+)$/gm)];
    for (const match of traitMatches) {
      const traitName = match[1].trim();
      const traitDesc = match[2].trim();
      const traitItem = baseItem({ name: traitName, type: "trait", description: traitDesc });
      traitItem.system.details.category = name;
      traits.push(traitItem);
    }
  }

  return { ancestries, traits };
}

function maneuverAxisById(id) {
  if (id >= 100 && id < 200) return { axis: "fisico", aplicacao: "conflito" };
  if (id >= 200 && id < 300) return { axis: "fisico", aplicacao: "interacao" };
  if (id >= 300 && id < 400) return { axis: "fisico", aplicacao: "resistencia" };
  if (id >= 400 && id < 500) return { axis: "mental", aplicacao: "conflito" };
  if (id >= 500 && id < 600) return { axis: "mental", aplicacao: "interacao" };
  if (id >= 600 && id < 700) return { axis: "mental", aplicacao: "resistencia" };
  if (id >= 700 && id < 800) return { axis: "social", aplicacao: "interacao" };
  if (id >= 800 && id < 900) return { axis: "social", aplicacao: "conflito" };
  return { axis: "social", aplicacao: "resistencia" };
}

function parseManeuvers() {
  const files = [
    "02a_Matriz_Fisica.md",
    "02b_Matriz_Mental.md",
    "02c_Matriz_Social.md"
  ];

  const maneuvers = [];

  for (const file of files) {
    const text = read(file);
    const matches = [...text.matchAll(/###\s+([0-9]+)\.\s+([^\n]+)/g)];
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index;
      const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
      const chunk = text.slice(start, end);

      const id = Number(matches[i][1]);
      const name = matches[i][2].trim();
      const item = baseItem({ name, type: "maneuver", description: chunk });

      const costMatch = chunk.match(/\*\*Custo:\*\*\s*([^|\n]+)/);
      const rangeMatch = chunk.match(/\*\*Alcance:\*\*\s*([^|\n]+)/);
      const checkMatch = chunk.match(/\*\*Check:\*\*\s*([^|\n]+)/);
      const successMatch = chunk.match(/\*\*Sucesso:\*\*\s*([^\n]+)/);
      const critMatch = chunk.match(/\*\*Cr[ií]tico:\*\*\s*([^\n]+)/);
      const partialMatch = chunk.match(/\*\*F\.\s*Parcial:\*\*\s*([^\n]+)/);
      const noteMatch = chunk.match(/Nota de Campo:\*\*\s*([^\n]+)/);

      const axisInfo = maneuverAxisById(id);
      item.system.roll.axis = axisInfo.axis;
      item.system.roll.aplicacao = axisInfo.aplicacao;
      item.system.roll.isAttack = true;

      item.system.activation.cost = costMatch?.[1]?.trim() ?? "";
      item.system.range = rangeMatch?.[1]?.trim() ?? "";
      item.system.check = checkMatch?.[1]?.trim() ?? "";
      item.system.effect = successMatch?.[1]?.trim() ?? "";
      item.system.damage = extractDamageFormula(chunk);

      const dcValue = extractDcValue(chunk);
      if (dcValue) item.system.dc = String(dcValue);

      item.system.details.tags = noteMatch ? ["Nota de Campo"] : [];
      if (critMatch) item.system.details.tags.push(`Crítico: ${critMatch[1].trim()}`);
      if (partialMatch) item.system.details.tags.push(`Parcial: ${partialMatch[1].trim()}`);

      maneuvers.push(item);
    }
  }

  return maneuvers;
}

function parseConditions() {
  const text = read("03_Codex_de_Combate_e_Condicoes.md");
  const lines = text.split("\n").filter(line => line.startsWith("|"));
  const dataLines = lines.slice(2);
  const conditions = [];

  for (const line of dataLines) {
    const parts = line.split("|").map(p => p.trim()).filter(Boolean);
    if (parts.length < 3) continue;
    const name = parts[1].replace(/\*\*/g, "").trim();
    const effect = parts[2].trim();
    const removal = parts[3]?.trim() ?? "";

    const item = baseItem({ name, type: "condition", description: `${effect}\n\nRemoção: ${removal}` });
    item.system.effect = effect;
    conditions.push(item);
  }

  return conditions;
}

function parseEquipment() {
  const text = read("04_Arsenal_e_Economia.md");
  const equipment = [];

  function extractSection(number) {
    const escaped = number.replace(".", "\\.");
    const re = new RegExp(`###\\s+${escaped}[^\\n]*\\n([\\s\\S]*?)(?=\\n###\\s+\\d+\\.\\d+|\\n##\\s+|$)`);
    const match = text.match(re);
    return match?.[1] ?? "";
  }

  function cleanName(value = "") {
    return value.replace(/\*\*/g, "").trim();
  }

  function parseTags(value = "") {
    return value.split(",").map(t => t.trim()).filter(t => t && t !== "-");
  }

  function isMarkdownSeparator(value = "") {
    return /^:?-{2,}:?$/.test(value.trim());
  }

  function parseTableRows(sectionText) {
    const lines = sectionText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.startsWith("|"));
    if (lines.length < 3) return [];

    const rows = [];
    for (const row of lines.slice(2)) {
      const cols = row
        .split("|")
        .slice(1, -1)
        .map(c => c.trim());

      if (cols.length < 2) continue;
      if (cols.every(isMarkdownSeparator)) continue;

      const first = cleanName(cols[0]);
      if (!first || isMarkdownSeparator(first)) continue;
      if (/^(Arma|Item|Armadura|Escudo|N(?:i|\u00ed)vel)$/i.test(first)) continue;

      rows.push(cols);
    }
    return rows;
  }

  function parseWeaponSections() {
    const sections = ["2.2", "2.3", "2.4", "2.5"];
    for (const sectionNumber of sections) {
      const rows = parseTableRows(extractSection(sectionNumber));
      for (const row of rows) {
        const [rawName, weaponType = "", damage = "", tags = "", price = "", desc = ""] = row;
        const name = cleanName(rawName);
        if (!name) continue;

        const item = baseItem({ name, type: "weapon", description: desc });
        item.system.weapon.damage = damage.trim() === "-" ? "" : damage.trim();
        item.system.weapon.tags = parseTags(tags);
        item.system.details.category = weaponType.trim() === "-" ? "" : weaponType.trim();
        item.system.price = price.trim();
        item.system.damage = item.system.weapon.damage;
        item.system.roll.axis = "fisico";
        item.system.roll.aplicacao = "conflito";
        item.system.roll.isAttack = true;
        equipment.push(item);
      }
    }
  }

  function parseArmorSection() {
    const rows = parseTableRows(extractSection("3.2"));
    for (const row of rows) {
      const [rawName, armorType = "", ca = "", tags = "", penalty = "", price = "", desc = ""] = row;
      const name = cleanName(rawName);
      if (!name) continue;

      const item = baseItem({ name, type: "armor", description: desc });
      item.system.armor.bonus = Number(ca.replace(/[^0-9-]/g, "")) || 0;
      item.system.armor.tags = parseTags(tags);
      item.system.details.category = armorType.trim();
      item.system.price = price.trim();
      item.system.armor.penalty = penalty.trim();
      equipment.push(item);
    }
  }

  function parseShieldSection() {
    const rows = parseTableRows(extractSection("3.3"));
    for (const row of rows) {
      const [rawName, shieldType = "", ca = "", tags = "", price = "", desc = ""] = row;
      const name = cleanName(rawName);
      if (!name) continue;

      const item = baseItem({ name, type: "shield", description: desc });
      item.system.shield.bonus = Number(ca.replace(/[^0-9-]/g, "")) || 0;
      item.system.shield.tags = parseTags(tags);
      item.system.shield.type = shieldType.trim();
      item.system.price = price.trim();
      equipment.push(item);
    }
  }

  parseWeaponSections();
  parseArmorSection();
  parseShieldSection();

  const consumablesSection = extractSection("4.1");
  const consumables = [...consumablesSection.matchAll(/-\s+\*\*(.+?)\:\*\*\s*(.+)/g)];
  for (const match of consumables) {
    const item = baseItem({ name: match[1].trim(), type: "consumable", description: match[2].trim() });
    equipment.push(item);
  }

  const toolsSection = extractSection("4.2");
  const tools = [...toolsSection.matchAll(/-\s+\*\*(.+?)\:\*\*\s*(.+)/g)];
  for (const match of tools) {
    const item = baseItem({ name: match[1].trim(), type: "equipment", description: match[2].trim() });
    equipment.push(item);
  }

  return equipment;
}
function parseRunes() {
  const text = read("04_Arsenal_e_Economia.md");
  const runes = [];
  const runeSection = text.split(/6\.2/)[1] || "";
  const section = runeSection.split(/Aviso de Slot/)[0];
  const matches = [...section.matchAll(/####\s+(.+?)\r?\n\r?\n([\s\S]*?)(?=####|$)/g)];

  for (const match of matches) {
    const name = match[1].trim();
    const desc = match[2].trim();
    if (!name) continue;
    const item = baseItem({ name, type: "rune", description: desc });
    runes.push(item);
  }

  return runes;
}

function parseTalents() {
  const text = read("11_Compendio_de_Talentos.md");
  const talents = [];
  const sections = text.split(/##\s+/).slice(1);
  for (const section of sections) {
    const [titleLine, ...rest] = section.split("\n");
    const category = titleLine.replace(/[#*]/g, "").trim();
    const sectionText = rest.join("\n");
    const entries = [...sectionText.matchAll(/-\s+\*\*(.+?)\:\*\*\s*(.+)/g)];
    for (const entry of entries) {
      const item = baseItem({ name: entry[1].trim(), type: "talent", description: entry[2].trim() });
      item.system.details.category = category;
      talents.push(item);
    }
  }
  return talents;
}

function parseBackgrounds() {
  const text = read("10_Antecedentes_e_Origens.md");
  const backgrounds = [];
  const matches = [...text.matchAll(/##\s+\d+\.\s+([^\n]+)\n([\s\S]*?)(?=##\s+\d+\.|$)/g)];

  for (const match of matches) {
    const name = match[1].trim();
    const block = match[2].trim();
    const item = baseItem({ name, type: "background", description: block });
    backgrounds.push(item);
  }
  return backgrounds;
}

function parseSpells() {
  const files = [
    "12_02_Grimorio_Circulo_0.md",
    "12_03_Grimorio_Circulo_1.md",
    "12_04_Grimorio_Circulo_2.md",
    "12_05_Grimorio_Circulo_3.md",
    "12_06_Grimorio_Circulo_4.md",
    "12_07_Grimorio_Circulo_5.md",
    "12_08_Grimorio_Circulo_6.md",
    "12_09_Grimorio_Circulo_7.md",
    "12_10_Grimorio_Circulo_8.md",
    "12_11_Grimorio_Circulo_9.md",
    "12_12_Grimorio_Circulo_10.md"
  ];

  const spells = [];

  for (const file of files) {
    const text = read(file);
    const circleMatch = file.match(/Circulo_(\d+)/);
    const circle = circleMatch ? Number(circleMatch[1]) : 0;

    const matches = [...text.matchAll(/##\s+\d+\.\s+([^\n]+)\n([\s\S]*?)(?=##\s+\d+\.|$)/g)];
    for (const match of matches) {
      const name = match[1].trim();
      const block = match[2].trim();

      const item = baseItem({ name, type: "spell", description: block });
      item.system.circle = circle;
      item.system.roll.axis = "mental";
      item.system.roll.aplicacao = "conflito";

      const schoolMatch = block.match(/\*\*Escola:\*\*\s*([^\n]+)/);
      const timeMatch = block.match(/\*\*Tempo:\*\*\s*([^\n]+)/);
      const rangeMatch = block.match(/\*\*Alcance:\*\*\s*([^\n]+)/);
      const compMatch = block.match(/\*\*Componentes:\*\*\s*([^\n]+)/);
      const durMatch = block.match(/\*\*Duração:\*\*\s*([^\n]+)/);

      item.system.school = schoolMatch?.[1]?.trim() ?? "";
      item.system.activation.cost = timeMatch?.[1]?.trim() ?? "";
      item.system.range = rangeMatch?.[1]?.trim() ?? "";
      item.system.components = compMatch?.[1]?.trim() ?? "";
      item.system.duration = durMatch?.[1]?.trim() ?? "";

      const damage = extractDamageFormula(block);
      if (damage) item.system.damage = damage;

      const dcValue = extractDcValue(block);
      if (dcValue) item.system.dc = String(dcValue);

      item.system.roll.isAttack = damage !== "" || inferIsAttack(block);

      spells.push(item);
    }
  }

  return spells;
}

function parseClasses() {
  const files = [
    "05_01_Vanguarda.md",
    "05_02_Tecelao.md",
    "05_03_Emissario.md",
    "05_04_Cacador.md"
  ];

  const classes = [];

  for (const file of files) {
    const text = read(file);
    const titleMatch = text.match(/#\s+Pandorha:\s+([^\n]+)/);
    const name = titleMatch ? titleMatch[1].replace(/Dossiê do /i, "").trim() : file;

    const item = baseItem({ name, type: "class", description: text });

    const baseHpMatch = text.match(/\*\*\+([0-9]+) HP\*\*/);
    const basePvMatch = text.match(/\*\*\+([0-9]+) Vigor\*\*/);
    const baseEeMatch = text.match(/\*\*\+([0-9]+) EE\*\*/);

    item.system.classData.baseHp = baseHpMatch ? Number(baseHpMatch[1]) : 0;
    item.system.classData.basePv = basePvMatch ? Number(basePvMatch[1]) : 0;
    item.system.classData.baseEe = baseEeMatch ? Number(baseEeMatch[1]) : 0;

    classes.push(item);
  }

  return classes;
}

function parseClassFeatures() {
  const files = [
    "05_01_Vanguarda.md",
    "05_02_Tecelao.md",
    "05_03_Emissario.md",
    "05_04_Cacador.md"
  ];

  const features = [];

  for (const file of files) {
    const text = read(file);
    const titleMatch = text.match(/#\s+Pandorha:\s+([^\n]+)/);
    const className = titleMatch ? titleMatch[1].replace(/Dossiê do /i, "").trim() : file;

    const passiveMatch = text.match(/Habilidade Passiva:\s+([^\n]+)/);
    if (passiveMatch) {
      const name = passiveMatch[1].trim();
      const block = text.split(/Habilidade Passiva:/)[1]?.split(/---/)[0] ?? "";
      const item = baseItem({ name, type: "feature", description: block.trim() });
      item.system.details.category = `${className} - Passiva`;
      item.system.activation.cost = "Passiva";
      item.system.damage = extractDamageFormula(block);
      const dcValue = extractDcValue(block);
      if (dcValue) item.system.dc = String(dcValue);
      item.system.roll.isAttack = inferIsAttack(block);
      features.push(item);
    }

    const talentSection = text.split(/Talentos Iniciais/)[1]?.split(/Especializa/)[0] ?? "";
    const talentEntries = [...talentSection.matchAll(/####\s+\d+\.\s+([^\n]+)\n([\s\S]*?)(?=####|$)/g)];
    for (const entry of talentEntries) {
      const name = entry[1].replace(/\[.*?\]/g, "").trim();
      const block = entry[2].trim();
      const item = baseItem({ name, type: "feature", description: block });
      item.system.details.category = `${className} - Talento Inicial`;
      const costMatch = entry[1].match(/\[(.+?)\]/);
      if (costMatch) item.system.activation.cost = costMatch[1];
      item.system.damage = extractDamageFormula(block);
      const dcValue = extractDcValue(block);
      if (dcValue) item.system.dc = String(dcValue);
      item.system.roll.isAttack = inferIsAttack(block) || item.system.damage !== "";
      features.push(item);
    }

    const specSection = text.split(/Especializa/)[1] ?? "";
    const specMatches = [...specSection.matchAll(/###\s+([A-C])\.\s+([^\n]+)\n([\s\S]*?)(?=###\s+[A-C]\.\s+|##|$)/g)];
    for (const spec of specMatches) {
      const specName = spec[2].trim();
      const specBlock = spec[3];
      const specEntries = [...specBlock.matchAll(/-\s+\*\*N(?:ível|Ã­vel)\s+([0-9]+)\s+-\s+([^\n]+)\*\*\:?\n([\s\S]*?)(?=\n-\s+\*\*N(?:ível|Ã­vel)|$)/g)];
      for (const entry of specEntries) {
        const level = entry[1].trim();
        const name = entry[2].replace(/\(.+?\)/g, "").trim();
        const block = entry[3].trim();
        const item = baseItem({ name, type: "feature", description: block });
        item.system.details.category = `${className} - ${specName}`;
        item.system.details.requirements = `Nível ${level}`;
        item.system.damage = extractDamageFormula(block);
        const dcValue = extractDcValue(block);
        if (dcValue) item.system.dc = String(dcValue);
        item.system.roll.isAttack = inferIsAttack(block) || item.system.damage !== "";
        features.push(item);
      }
    }

    const journeyMatches = [...text.matchAll(/###\s+N(?:ível|Ã­vel)\s+([0-9]+)\:\s+([^\n]+)\n([\s\S]*?)(?=###\s+N(?:ível|Ã­vel)\s+|$)/g)];
    for (const entry of journeyMatches) {
      const level = entry[1].trim();
      const name = entry[2].trim();
      const block = entry[3].trim();
      const item = baseItem({ name, type: "feature", description: block });
      item.system.details.category = `${className} - Jornada`;
      item.system.details.requirements = `Nível ${level}`;
      item.system.damage = extractDamageFormula(block);
      const dcValue = extractDcValue(block);
      if (dcValue) item.system.dc = String(dcValue);
      item.system.roll.isAttack = inferIsAttack(block) || item.system.damage !== "";
      features.push(item);
    }
  }

  return features;
}

function parseDiseases() {
  const text = read("19_Codex_de_Enfermidades.md");
  const entries = [...text.matchAll(/###\s+\d+\.\s+([^\n]+)\n([\s\S]*?)(?=###\s+\d+\.|$)/g)];
  const diseases = [];
  for (const entry of entries) {
    const item = baseItem({ name: entry[1].trim(), type: "disease", description: entry[2].trim() });
    diseases.push(item);
  }
  return diseases;
}

function parseToxins() {
  const text = read("20_Codex_de_Toxinas.md");
  const entries = [...text.matchAll(/###\s+\d+\.\s+([^\n]+)\n([\s\S]*?)(?=###\s+\d+\.|$)/g)];
  const toxins = [];
  for (const entry of entries) {
    const item = baseItem({ name: entry[1].trim(), type: "toxin", description: entry[2].trim() });
    toxins.push(item);
  }
  return toxins;
}

function parseMonsterAbilities() {
  const files = [
    "14_Compendio_de_Habilidades_de_Monstros.md",
    "15_Compendio_de_Habilidades_de_Monstros_Tier2.md",
    "16_Compendio_de_Habilidades_de_Monstros_Tier3.md",
    "17_Compendio_de_Habilidades_de_Monstros_Tier4.md"
  ];

  const abilities = [];

  for (const file of files) {
    const text = read(file);
    const category = file.replace(/\.md$/, "");
    const entries = [...text.matchAll(/^\s*\d+\.\s+\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=^\s*\d+\.\s+\*\*|$)/gm)];

    for (const entry of entries) {
      const name = entry[1].trim();
      const block = entry[2].trim();
      const item = baseItem({ name, type: "ability", description: block });
      item.system.details.category = category;
      item.system.damage = extractDamageFormula(block);
      const dcValue = extractDcValue(block);
      if (dcValue) item.system.dc = String(dcValue);
      item.system.roll.isAttack = inferIsAttack(block) || item.system.damage !== "";
      abilities.push(item);
    }
  }

  return abilities;
}

function parseBestiary() {
  const files = [
    "07_01a_Tier1_Mundo_Natural.md",
    "07_01b_Tier1_Sobrenatural.md",
    "07_02a_Tier2_Feras_e_Gigantes.md",
    "07_02b_Tier2_Magia_e_Morte.md",
    "07_03a_Tier3_Lendas_Vivas.md",
    "07_03b_Tier3_Horrores_Etericos.md",
    "07_04a_Tier4_Deuses_e_Titans.md"
  ];

  const actors = [];

  for (const file of files) {
    const text = read(file);
    const entries = [...text.matchAll(/###\s+[A-Z]\.?\s+([^\n]+)\n([\s\S]*?)(?=###\s+[A-Z]\.?\s+|$)/g)];
    for (const entry of entries) {
      const name = entry[1].replace(/\(.*?\)/g, "").trim();
      const block = entry[2].trim();

      const hpMatch = block.match(/\*\*HP:\*\*\s*([0-9]+)/);
      const caMatch = block.match(/\*\*CA:\*\*\s*([0-9]+)/);
      const movMatch = block.match(/\*\*Movimento:\*\*\s*([0-9]+)/);
      const eixoMatch = block.match(/\*\*Eixos:\*\*\s*Físico\s*([+\-]?[0-9]+),\s*Mental\s*([+\-]?[0-9]+),\s*Social\s*([+\-]?[0-9]+)/);
      const appMatch = block.match(/\*\*Aplicações:\*\*\s*Conflito\s*([+\-]?[0-9]+),\s*Resistência\s*([+\-]?[0-9]+),\s*Interação\s*([+\-]?[0-9]+)/);
      const initMatch = block.match(/\*\*Iniciativa:\*\*\s*([+\-]?[0-9]+)/);

      const actor = {
        _id: randomId(),
        name,
        type: "monster",
        img: "icons/svg/mystery-man.svg",
        system: {
          description: toHtml(block),
          details: {
            biography: toHtml(block),
            notes: "",
            ancestry: "",
            class: "",
            background: "",
            crest: "",
            portrait: ""
          },
          attributes: {
            level: 1,
            xp: 0,
            tier: 1
          },
          eixos: {
            fisico: eixoMatch ? Number(eixoMatch[1]) : 0,
            mental: eixoMatch ? Number(eixoMatch[2]) : 0,
            social: eixoMatch ? Number(eixoMatch[3]) : 0
          },
          aplicacoes: {
            conflito: appMatch ? Number(appMatch[1]) : 0,
            interacao: appMatch ? Number(appMatch[3]) : 0,
            resistencia: appMatch ? Number(appMatch[2]) : 0
          },
          potencial: 0,
          resources: {
            hp: { value: hpMatch ? Number(hpMatch[1]) : 0, max: hpMatch ? Number(hpMatch[1]) : 0, temp: 0 },
            pv: { value: 0, max: 0 },
            ee: { value: 0, max: 0 },
            actions: { value: 3, max: 3 },
            reaction: { value: 1, max: 1 }
          },
          defenses: {
            ca: caMatch ? Number(caMatch[1]) : 10,
            caBase: caMatch ? Number(caMatch[1]) : 10
          },
          movement: {
            base: movMatch ? Number(movMatch[1]) : 9,
            climb: 0,
            swim: 0,
            fly: 0
          },
          training: {
            weapons: [],
            armors: [],
            skills: []
          },
          derived: {
            initiative: initMatch ? Number(initMatch[1]) : 0,
            dc: 10,
            carryMax: 0,
            carrySlots: 0
          }
        },
        items: []
      };

      actors.push(actor);
    }
  }

  return actors;
}

function main() {
  ensureOutDir();

  const target = (process.argv[2] || "all").toLowerCase();
  if (target === "equipment") {
    writePack("equipment", parseEquipment());
    return;
  }

  const { ancestries, traits } = parseAncestries();
  writePack("ancestries", ancestries);
  writePack("traits", traits);

  writePack("maneuvers", parseManeuvers());
  writePack("conditions", parseConditions());
  writePack("equipment", parseEquipment());
  writePack("runes", parseRunes());
  writePack("talents", parseTalents());
  writePack("backgrounds", parseBackgrounds());
  writePack("spells", parseSpells());
  writePack("classes", parseClasses());
  writePack("class-features", parseClassFeatures());
  writePack("diseases", parseDiseases());
  writePack("toxins", parseToxins());
  writePack("monster-abilities", parseMonsterAbilities());
  writePack("bestiary", parseBestiary());
}

main();
