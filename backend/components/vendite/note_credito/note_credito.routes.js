// Componente «Note credito»: API REST /api/note_credito
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("note_credito"),
);
