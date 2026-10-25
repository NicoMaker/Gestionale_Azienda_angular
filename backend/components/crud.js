// Fabbrica di router CRUD: riceve la definizione di una tabella (da schema-loader)
const { Router } = require("express");
const db = require("../db/database");
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next);

module.exports = (t) => {
  const r = Router();
  const nomi = t.campi.map((c) => c.k),
    q = (s) => `"${s}"`;
  const vals = (b) => nomi.map((f) => (b[f] === "" ? null : (b[f] ?? null)));
  r.get(
    "/",
    wrap(async (req, res) =>
      res.json(await db.all(`${t.select} ORDER BY 1 DESC`)),
    ),
  );
  r.post(
    "/",
    wrap(async (req, res) => {
      const x = await db.run(
        `INSERT INTO ${q(t.nome)}(${nomi.map(q)}) VALUES(${nomi.map(() => "?")})`,
        vals(req.body),
      );
      res.status(201).json({ id: x.id });
    }),
  );
  r.put(
    "/:id",
    wrap(async (req, res) => {
      await db.run(
        `UPDATE ${q(t.nome)} SET ${nomi.map((f) => q(f) + "=?")} WHERE id=?`,
        [...vals(req.body), req.params.id],
      );
      res.json({ ok: true });
    }),
  );
  r.delete(
    "/:id",
    wrap(async (req, res) => {
      await db.run(`DELETE FROM ${q(t.nome)} WHERE id=?`, [req.params.id]);
      res.json({ ok: true });
    }),
  );
  return r;
};
