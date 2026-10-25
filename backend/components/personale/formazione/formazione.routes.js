// Componente «Formazione»: API REST /api/formazione
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("formazione"),
);
