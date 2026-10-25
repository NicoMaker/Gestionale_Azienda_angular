// Componente «Feedback»: API REST /api/feedback
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("feedback"),
);
