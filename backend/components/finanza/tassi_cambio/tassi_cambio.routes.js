// Componente «Tassi cambio»: API REST /api/tassi_cambio
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("tassi_cambio"),
);
