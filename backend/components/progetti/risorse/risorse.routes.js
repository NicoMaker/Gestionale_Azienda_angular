// Componente «Risorse»: API REST /api/risorse
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("risorse"),
);
