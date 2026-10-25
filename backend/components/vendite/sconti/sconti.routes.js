// Componente «Sconti»: API REST /api/sconti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("sconti"),
);
