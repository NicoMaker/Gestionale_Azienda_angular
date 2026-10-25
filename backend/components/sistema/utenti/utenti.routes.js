// Componente «Utenti»: API REST /api/utenti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("utenti"),
);
