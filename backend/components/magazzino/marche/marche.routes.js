// Componente «Marche»: API REST /api/marche
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("marche"),
);
