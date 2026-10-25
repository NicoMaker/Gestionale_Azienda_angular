// Componente «Unita misura»: API REST /api/unita_misura
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("unita_misura"),
);
