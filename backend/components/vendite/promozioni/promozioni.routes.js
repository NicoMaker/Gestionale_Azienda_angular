// Componente «Promozioni»: API REST /api/promozioni
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("promozioni"),
);
