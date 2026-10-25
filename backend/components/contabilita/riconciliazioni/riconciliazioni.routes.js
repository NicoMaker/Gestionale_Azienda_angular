// Componente «Riconciliazioni»: API REST /api/riconciliazioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("riconciliazioni"),
);
