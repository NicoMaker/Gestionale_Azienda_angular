// Componente «Documenti progetto»: API REST /api/documenti_progetto
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("documenti_progetto"),
);
