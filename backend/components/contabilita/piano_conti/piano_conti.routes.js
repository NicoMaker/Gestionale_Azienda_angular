// Componente «Piano conti»: API REST /api/piano_conti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("piano_conti"),
);
