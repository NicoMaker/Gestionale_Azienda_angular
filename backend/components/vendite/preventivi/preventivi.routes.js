// Componente «Preventivi»: API REST /api/preventivi
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("preventivi"),
);
