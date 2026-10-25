// Componente «Note debito»: API REST /api/note_debito
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("note_debito"),
);
