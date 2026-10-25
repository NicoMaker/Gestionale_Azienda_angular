// Componente «Valutazioni personale»: API REST /api/valutazioni_personale
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("valutazioni_personale"),
);
