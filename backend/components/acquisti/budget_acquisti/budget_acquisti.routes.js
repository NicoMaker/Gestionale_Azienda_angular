// Componente «Budget acquisti»: API REST /api/budget_acquisti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("budget_acquisti"),
);
