// Componente «Selezioni»: API REST /api/selezioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("selezioni"),
);
