// Componente «Contatti»: API REST /api/contatti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("contatti"),
);
