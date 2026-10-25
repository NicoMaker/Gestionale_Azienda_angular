// Componente «Valutazioni fornitori»: API REST /api/valutazioni_fornitori
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("valutazioni_fornitori"),
);
