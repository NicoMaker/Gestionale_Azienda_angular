// Componente «Clienti»: API REST /api/clienti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("clienti"),
);
