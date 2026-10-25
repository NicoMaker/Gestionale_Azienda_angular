// Componente «Registrazioni»: API REST /api/registrazioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("registrazioni"),
);
