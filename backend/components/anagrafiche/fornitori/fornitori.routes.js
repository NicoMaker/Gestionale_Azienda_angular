// Componente «Fornitori»: API REST /api/fornitori
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("fornitori"),
);
