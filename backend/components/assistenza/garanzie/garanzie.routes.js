// Componente «Garanzie»: API REST /api/garanzie
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("garanzie"),
);
