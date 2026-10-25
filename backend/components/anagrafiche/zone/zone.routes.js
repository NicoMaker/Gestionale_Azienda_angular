// Componente «Zone»: API REST /api/zone
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("zone"),
);
