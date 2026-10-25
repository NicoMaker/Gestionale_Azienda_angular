// Componente «Listini»: API REST /api/listini
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("listini"),
);
