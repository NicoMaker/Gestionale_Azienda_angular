// Componente «Ferie»: API REST /api/ferie
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ferie"),
);
