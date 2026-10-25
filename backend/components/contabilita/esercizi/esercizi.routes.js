// Componente «Esercizi»: API REST /api/esercizi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("esercizi"),
);
