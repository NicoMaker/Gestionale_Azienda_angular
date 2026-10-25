// Componente «Notifiche»: API REST /api/notifiche
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("notifiche"),
);
