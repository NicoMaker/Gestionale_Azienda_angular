// Componente «Fatture»: API REST /api/fatture
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("fatture"),
);
