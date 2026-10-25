// Componente «Scadenzario»: API REST /api/scadenzario
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("scadenzario"),
);
