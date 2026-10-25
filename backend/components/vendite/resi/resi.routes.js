// Componente «Resi»: API REST /api/resi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("resi"),
);
