// Componente «Richieste»: API REST /api/richieste
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("richieste"),
);
