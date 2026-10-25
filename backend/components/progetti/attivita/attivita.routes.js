// Componente «Attivita»: API REST /api/attivita
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("attivita"),
);
