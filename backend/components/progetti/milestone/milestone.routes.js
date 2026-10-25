// Componente «Milestone»: API REST /api/milestone
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("milestone"),
);
