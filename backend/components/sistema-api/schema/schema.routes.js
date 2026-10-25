// Espone lo schema (gruppi e tabelle) al front
const r = require("express").Router();
r.get("/", (req, res) =>
  res.json(require("../../../db/schema-loader").schemaFront()),
);
module.exports = r;
