// Componente «Lotti»: API REST /api/lotti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("lotti"),
);
