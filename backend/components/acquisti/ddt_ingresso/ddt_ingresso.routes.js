// Componente «Ddt ingresso»: API REST /api/ddt_ingresso
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ddt_ingresso"),
);
