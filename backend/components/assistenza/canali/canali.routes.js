// Componente «Canali»: API REST /api/canali
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("canali"),
);
