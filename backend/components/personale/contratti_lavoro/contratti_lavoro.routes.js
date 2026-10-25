// Componente «Contratti lavoro»: API REST /api/contratti_lavoro
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("contratti_lavoro"),
);
