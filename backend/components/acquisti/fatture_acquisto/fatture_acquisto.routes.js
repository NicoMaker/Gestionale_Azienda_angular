// Componente «Fatture acquisto»: API REST /api/fatture_acquisto
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("fatture_acquisto"),
);
