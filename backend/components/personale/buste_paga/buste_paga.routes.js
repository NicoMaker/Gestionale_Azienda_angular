// Componente «Buste paga»: API REST /api/buste_paga
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("buste_paga"),
);
