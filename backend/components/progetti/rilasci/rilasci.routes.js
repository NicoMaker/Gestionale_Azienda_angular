// Componente «Rilasci»: API REST /api/rilasci
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("rilasci"),
);
