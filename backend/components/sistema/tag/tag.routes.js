// Componente «Tag»: API REST /api/tag
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("tag"),
);
