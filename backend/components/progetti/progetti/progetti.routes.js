// Componente «Progetti»: API REST /api/progetti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("progetti"),
);
