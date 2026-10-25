// Componente «Movimenti magazzino»: API REST /api/movimenti_magazzino
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("movimenti_magazzino"),
);
