// Componente «Reparti»: API REST /api/reparti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("reparti"),
);
