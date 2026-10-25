// Componente «Backup log»: API REST /api/backup_log
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("backup_log"),
);
