// Componente «Allegati»: API REST /api/allegati
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("allegati"),
);
