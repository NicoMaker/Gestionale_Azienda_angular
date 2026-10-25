// Componente «Titoli»: API REST /api/titoli
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("titoli"),
);
