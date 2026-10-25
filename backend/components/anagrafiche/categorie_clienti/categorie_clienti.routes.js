// Componente «Categorie clienti»: API REST /api/categorie_clienti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("categorie_clienti"),
);
