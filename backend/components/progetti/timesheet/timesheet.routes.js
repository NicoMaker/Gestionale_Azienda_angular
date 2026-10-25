// Componente «Timesheet»: API REST /api/timesheet
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("timesheet"),
);
