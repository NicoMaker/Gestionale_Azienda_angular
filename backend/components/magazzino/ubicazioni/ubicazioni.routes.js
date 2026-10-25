// Componente «Ubicazioni»: API REST /api/ubicazioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ubicazioni"),
);
