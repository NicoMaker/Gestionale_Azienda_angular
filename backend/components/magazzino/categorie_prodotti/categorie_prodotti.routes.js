// Componente «Categorie prodotti»: API REST /api/categorie_prodotti
module.exports = require("../../crud")(
  require("../../../db/schema-loader").tabella("categorie_prodotti"),
);
