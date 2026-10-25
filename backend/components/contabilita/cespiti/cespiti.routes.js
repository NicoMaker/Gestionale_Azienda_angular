// Componente «Cespiti»: API REST /api/cespiti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("cespiti"),
);
