// Componente «Spese progetto»: API REST /api/spese_progetto
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("spese_progetto"),
);
