const ids = require("../scrap/archivo.json");
const scraps = require("../scrap/oportunidades.json");

// Muestra todos los productos
exports.mostrarPropuestas = async (req, res, next) => {
  const id = req.params.id;
  res.json({
    algo: id,
  });
};
exports.idsPropuestas = async (req, res) => {
  res.json(ids);
};
