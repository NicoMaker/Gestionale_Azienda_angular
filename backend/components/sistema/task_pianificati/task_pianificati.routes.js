// Componente «Task pianificati»: API REST /api/task_pianificati
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("task_pianificati"),
);
