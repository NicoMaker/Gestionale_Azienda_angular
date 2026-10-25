// Componente «Giacenze»: API REST /api/giacenze
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("giacenze"),
);
