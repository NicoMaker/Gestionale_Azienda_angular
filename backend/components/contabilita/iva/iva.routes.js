// Componente «Iva»: API REST /api/iva
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("iva"),
);
