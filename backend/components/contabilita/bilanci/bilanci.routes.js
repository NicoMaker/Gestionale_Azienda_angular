// Componente «Bilanci»: API REST /api/bilanci
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("bilanci"),
);
