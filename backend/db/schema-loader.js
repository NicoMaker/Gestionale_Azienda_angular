// Legge schema/tabelle.js e ne ricava: DDL SQL, query di lettura con join e schema per il front
const GRUPPI = require("../../schema/tabelle");
const cap = (s) =>
  s
    .replace(/_id$/, "")
    .replace(/_/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
const TIPO = {
  "*": "text",
  "@": "email",
  "#": "number",
  "€": "number",
  "~": "date",
};

function campo(s) {
  const [, k, sy, da, op] = /^(\w+)([*@#€~])?(?:>(\w+)|\[(.+)\])?$/.exec(
    s.trim(),
  );
  const f = {
    k,
    l: cap(k),
    type: da || op ? "select" : TIPO[sy] || "text",
    req: sy === "*" || !!da,
  };
  if (da) f.da = da;
  if (op) f.opzioni = op.split("|");
  if (sy === "€") f.step = "0.01";
  f.sql = da || sy === "#" ? "INTEGER" : sy === "€" ? "REAL" : "TEXT";
  return f;
}

const tabelle = [];
for (const [gruppo, g] of Object.entries(GRUPPI))
  for (const riga of g.tabelle.trim().split("\n")) {
    const i = riga.indexOf(":"),
      nome = riga.slice(0, i).trim();
    const campi = riga
      .slice(i + 1)
      .split(",")
      .map(campo);
    tabelle.push({
      nome,
      gruppo,
      titolo: cap(nome),
      campi,
      label: (campi.find((c) => !c.da) || campi[0]).k,
    });
  }
const per = Object.fromEntries(tabelle.map((t) => [t.nome, t]));
for (const t of tabelle) {
  const fk = t.campi.filter((c) => c.da);
  t.ddl = `CREATE TABLE IF NOT EXISTS "${t.nome}" (id INTEGER PRIMARY KEY AUTOINCREMENT, ${t.campi
    .map(
      (c) =>
        `"${c.k}" ${c.sql}${c.da ? ` REFERENCES "${c.da}"(id) ON DELETE SET NULL` : ""}`,
    )
    .join(", ")})`;
  t.select =
    `SELECT t.*${fk.map((c, i) => `, j${i}."${per[c.da].label}" AS "${c.k.replace(/_id$/, "")}"`).join("")} FROM "${t.nome}" t` +
    fk
      .map((c, i) => ` LEFT JOIN "${c.da}" j${i} ON j${i}.id = t."${c.k}"`)
      .join("");
  t.colonne = t.campi.slice(0, 5).map((c) => ({
    k: c.da ? c.k.replace(/_id$/, "") : c.k,
    l: cap(c.k),
    fmt: c.step ? "euro" : c.k === "stato" ? "badge" : undefined,
  }));
}
const tabella = (n) => per[n];
// Schema pubblico per il front (senza SQL)
const schemaFront = () =>
  Object.entries(GRUPPI).map(([id, g]) => ({
    id,
    titolo: g.titolo,
    icona: g.icona,
    tabelle: tabelle
      .filter((t) => t.gruppo === id)
      .map(({ nome, titolo, campi, colonne, label }) => ({
        nome,
        titolo,
        label,
        colonne,
        campi: campi.map(({ sql, ...c }) => c),
      })),
  }));
module.exports = { tabelle, tabella, schemaFront };
