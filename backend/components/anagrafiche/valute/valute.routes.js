// Componente «Valute»: API REST /api/valute
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("valute"),
);
