// Componente «Sla»: API REST /api/sla
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("sla"),
);
