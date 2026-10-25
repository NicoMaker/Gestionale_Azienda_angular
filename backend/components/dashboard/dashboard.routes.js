// Statistiche per la dashboard
const { Router } = require("express");
const db = require("../../db/database");
const r = Router();
r.get("/", async (req, res, next) => {
  try {
    const [c, p, f] = await Promise.all([
      db.get("SELECT COUNT(*) n FROM clienti"),
      db.get("SELECT COUNT(*) n FROM prodotti"),
      db.get(
        "SELECT COUNT(*) n, COALESCE(SUM(importo),0) tot, COALESCE(SUM(CASE WHEN stato='pagata' THEN importo END),0) inc FROM fatture",
      ),
    ]);
    const perStato = await db.all(
      "SELECT stato, COUNT(*) n, SUM(importo) tot FROM fatture GROUP BY stato",
    );
    res.json({
      clienti: c.n,
      prodotti: p.n,
      fatture: f.n,
      fatturato: f.tot,
      incassato: f.inc,
      perStato,
    });
  } catch (e) {
    next(e);
  }
});
module.exports = r;
