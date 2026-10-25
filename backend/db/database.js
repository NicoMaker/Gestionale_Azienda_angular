// Connessione SQLite + helper a promise + schema e dati di esempio
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { tabelle } = require("./schema-loader");
const db = new sqlite3.Database(path.join(__dirname, "gestionale.db"));

const run = (sql, p = []) =>
  new Promise((ok, ko) =>
    db.run(sql, p, function (e) {
      e ? ko(e) : ok({ id: this.lastID, changes: this.changes });
    }),
  );
const all = (sql, p = []) =>
  new Promise((ok, ko) => db.all(sql, p, (e, r) => (e ? ko(e) : ok(r))));
const get = (sql, p = []) =>
  new Promise((ok, ko) => db.get(sql, p, (e, r) => (e ? ko(e) : ok(r))));

async function init() {
  await run("PRAGMA foreign_keys = ON");
  for (const t of tabelle) await run(t.ddl); // le 100 tabelle dallo schema
  const { n } = await get("SELECT COUNT(*) n FROM clienti");
  if (n === 0) {
    for (const c of [
      ["Rossi Srl", "info@rossi.it", "02 1234567", "Milano"],
      ["Bianchi SpA", "amm@bianchi.it", "06 7654321", "Roma"],
      ["Verdi & Co", "ciao@verdi.it", "011 998877", "Torino"],
    ])
      await run(
        "INSERT INTO clienti(nome,email,telefono,citta) VALUES(?,?,?,?)",
        c,
      );
    for (const p of [
      ["Consulenza finanziaria", 150, 999],
      ["Analisi di portafoglio", 480, 999],
      ["Report mensile", 90, 999],
    ])
      await run("INSERT INTO prodotti(nome,prezzo,giacenza) VALUES(?,?,?)", p);
    for (const f of [
      [1, "2026-09-12", 1200, "pagata"],
      [2, "2026-10-02", 3400.5, "emessa"],
      [3, "2026-10-18", 560, "bozza"],
      [1, "2026-10-20", 980, "emessa"],
    ])
      await run(
        "INSERT INTO fatture(cliente_id,data,importo,stato) VALUES(?,?,?,?)",
        f,
      );
  }
}
module.exports = { run, all, get, init };
