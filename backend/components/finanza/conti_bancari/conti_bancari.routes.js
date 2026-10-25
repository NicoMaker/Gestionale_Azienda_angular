// Componente «Conti bancari»: API REST /api/conti_bancari
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("conti_bancari"),
);
