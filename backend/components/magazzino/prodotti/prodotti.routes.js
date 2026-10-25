// Componente «Prodotti»: API REST /api/prodotti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("prodotti"),
);
