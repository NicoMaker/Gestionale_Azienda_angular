// Componente «Listini acquisto»: API REST /api/listini_acquisto
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("listini_acquisto"),
);
