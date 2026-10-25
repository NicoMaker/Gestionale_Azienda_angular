// Componente «Tecnici»: API REST /api/tecnici
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("tecnici"),
);
