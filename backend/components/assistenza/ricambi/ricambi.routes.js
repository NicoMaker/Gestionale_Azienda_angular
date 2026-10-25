// Componente «Ricambi»: API REST /api/ricambi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ricambi"),
);
