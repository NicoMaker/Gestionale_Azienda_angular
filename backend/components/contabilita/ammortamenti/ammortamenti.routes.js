// Componente «Ammortamenti»: API REST /api/ammortamenti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ammortamenti"),
);
