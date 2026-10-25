// Componente «Ticket»: API REST /api/ticket
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("ticket"),
);
