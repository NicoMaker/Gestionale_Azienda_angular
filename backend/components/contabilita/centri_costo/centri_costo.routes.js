// Componente «Centri costo»: API REST /api/centri_costo
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("centri_costo"),
);
