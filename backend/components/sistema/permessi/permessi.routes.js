// Componente «Permessi»: API REST /api/permessi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("permessi"),
);
