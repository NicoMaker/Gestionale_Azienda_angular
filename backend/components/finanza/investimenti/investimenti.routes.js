// Componente «Investimenti»: API REST /api/investimenti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("investimenti"),
);
