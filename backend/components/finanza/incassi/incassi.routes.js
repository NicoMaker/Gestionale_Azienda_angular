// Componente «Incassi»: API REST /api/incassi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("incassi"),
);
