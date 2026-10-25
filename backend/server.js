// Server Express: un router per ogni tabella (100), schema, backup, dashboard e front statico
const express = require("express");
const path = require("path");
const db = require("./db/database");
const { tabelle } = require("./db/schema-loader");
const app = express();
app.use(express.json());
for (const t of tabelle)
  app.use(
    "/api/" + t.nome,
    require(`./components/${t.gruppo}/${t.nome}/${t.nome}.routes`),
  );
app.use(
  "/api/schema",
  require("./components/sistema-api/schema/schema.routes"),
);
app.use(
  "/api/backup",
  require("./components/sistema-api/backup/backup.routes"),
);
app.use("/api/dashboard", require("./components/dashboard/dashboard.routes"));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ errore: err.message });
});
const PORT = process.env.PORT || 3000;
db.init().then(() =>
  app.listen(PORT, () => console.log(`Gestionale su http://localhost:${PORT}`)),
);
