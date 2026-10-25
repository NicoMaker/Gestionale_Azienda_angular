// Componente «Magazzini»: API REST /api/magazzini
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("magazzini"),
);
