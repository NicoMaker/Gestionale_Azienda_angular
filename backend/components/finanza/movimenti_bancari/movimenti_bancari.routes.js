// Componente «Movimenti bancari»: API REST /api/movimenti_bancari
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("movimenti_bancari"),
);
