// Componente «Dividendi»: API REST /api/dividendi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("dividendi"),
);
