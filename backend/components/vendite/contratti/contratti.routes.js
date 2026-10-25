// Componente «Contratti»: API REST /api/contratti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("contratti"),
);
