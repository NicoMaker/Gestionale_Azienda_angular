// Componente «Spese acquisto»: API REST /api/spese_acquisto
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("spese_acquisto"),
);
