// Componente «Nazioni»: API REST /api/nazioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("nazioni"),
);
