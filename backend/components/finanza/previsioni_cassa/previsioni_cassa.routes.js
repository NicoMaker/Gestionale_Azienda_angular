// Componente «Previsioni cassa»: API REST /api/previsioni_cassa
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("previsioni_cassa"),
);
