// Componente «Modelli email»: API REST /api/modelli_email
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("modelli_email"),
);
