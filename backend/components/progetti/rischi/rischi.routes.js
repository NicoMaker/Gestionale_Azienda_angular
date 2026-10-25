// Componente «Rischi»: API REST /api/rischi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("rischi"),
);
