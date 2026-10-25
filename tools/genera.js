// Genera i componenti del back (uno per tabella) e gli schemi Mermaid in docs/
const fs = require("fs"),
  path = require("path");
const { tabelle } = require("../backend/db/schema-loader");
const G = require("../schema/tabelle");
const root = path.join(__dirname, "..");
for (const t of tabelle) {
  const dir = path.join(root, "back/components", t.gruppo, t.nome);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, t.nome + ".routes.js"),
    `// Componente «${t.titolo}»: API REST /api/${t.nome}\nmodule.exports = require("../../crud")(require("../../../db/schema-loader").tabella("${t.nome}"));\n`,
  );
}
let er = "erDiagram\n";
for (const t of tabelle) {
  er +=
    `  ${t.nome} {\n    int id PK\n` +
    t.campi
      .map(
        (c) =>
          `    ${c.sql === "INTEGER" ? "int" : c.sql === "REAL" ? "real" : "text"} ${c.k}${c.da ? " FK" : ""}`,
      )
      .join("\n") +
    "\n  }\n";
  for (const c of t.campi.filter((c) => c.da))
    er += `  ${c.da} ||--o{ ${t.nome} : "${c.k}"\n`;
}
fs.writeFileSync(path.join(root, "docs/schema-db.mmd"), er);
let fl = "flowchart LR\n  DB[(SQLite gestionale.db)]\n";
for (const [id, g] of Object.entries(G)) {
  fl +=
    `  subgraph ${id}["${g.titolo}"]\n` +
    tabelle
      .filter((t) => t.gruppo === id)
      .map((t) => `    ${id}_${t.nome}[${t.nome}]`)
      .join("\n") +
    `\n  end\n  ${id} --> DB\n`;
}
fs.writeFileSync(path.join(root, "docs/schema-gruppi.mmd"), fl);
console.log(tabelle.length + " tabelle, " + Object.keys(G).length + " gruppi");
