// Componente «Pagamenti»: API REST /api/pagamenti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("pagamenti"),
);
