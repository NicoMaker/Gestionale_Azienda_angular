// Componente «Ordini clienti»: API REST /api/ordini_clienti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ordini_clienti"),
);
