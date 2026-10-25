// Componente «Presenze»: API REST /api/presenze
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("presenze"),
);
