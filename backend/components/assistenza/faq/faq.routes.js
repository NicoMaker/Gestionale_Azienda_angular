// Componente «Faq»: API REST /api/faq
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("faq"),
);
