// Componente «Banche»: API REST /api/banche
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("banche"),
);
