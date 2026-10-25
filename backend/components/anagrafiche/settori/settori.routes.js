// Componente «Settori»: API REST /api/settori
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("settori"),
);
