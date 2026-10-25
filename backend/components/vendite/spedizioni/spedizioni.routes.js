// Componente «Spedizioni»: API REST /api/spedizioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("spedizioni"),
);
