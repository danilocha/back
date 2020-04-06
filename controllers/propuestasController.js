const ids = require("../scrap/archivo.json");
const scraps = require("../scrap/oportunidades.json");

// Muestra todos los productos
exports.mostrarPropuestas = async (req, res, next) => {
  const id = req.params.id;
  function $id(objeto) {
    return objeto[0].id === id;
  }
  console.log(scraps.find($id));
  res.json(scraps.find($id));
};
exports.idsPropuestas = async (req, res) => {
  res.json(ids);
};
