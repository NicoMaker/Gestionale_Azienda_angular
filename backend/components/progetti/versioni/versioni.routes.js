// Componente «Versioni»: API REST /api/versioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("versioni"),
);
