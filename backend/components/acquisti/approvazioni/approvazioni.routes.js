// Componente «Approvazioni»: API REST /api/approvazioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("approvazioni"),
);
