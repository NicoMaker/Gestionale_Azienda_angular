// Componente «Log accessi»: API REST /api/log_accessi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("log_accessi"),
);
