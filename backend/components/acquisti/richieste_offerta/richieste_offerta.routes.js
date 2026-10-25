// Componente «Richieste offerta»: API REST /api/richieste_offerta
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("richieste_offerta"),
);
