// Componente «Agenti»: API REST /api/agenti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("agenti"),
);
