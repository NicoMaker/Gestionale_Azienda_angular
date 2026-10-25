// Componente «Interventi»: API REST /api/interventi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("interventi"),
);
