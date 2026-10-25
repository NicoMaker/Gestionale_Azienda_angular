// Componente «Ruoli»: API REST /api/ruoli
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ruoli"),
);
