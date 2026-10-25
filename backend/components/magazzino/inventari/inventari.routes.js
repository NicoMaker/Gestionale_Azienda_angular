// Componente «Inventari»: API REST /api/inventari
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("inventari"),
);
