// Componente «Ordini fornitori»: API REST /api/ordini_fornitori
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ordini_fornitori"),
);
