// Componente «Prestiti»: API REST /api/prestiti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("prestiti"),
);
