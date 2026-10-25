// Componente «Impostazioni»: API REST /api/impostazioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("impostazioni"),
);
