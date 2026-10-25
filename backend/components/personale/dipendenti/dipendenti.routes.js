// Componente «Dipendenti»: API REST /api/dipendenti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("dipendenti"),
);
