const express = require("express");
const router = express.Router();
const propuestasController = require("../controllers/propuestasController");

module.exports = () => {
  // Mostrar todos los productos
  router.get("/", (req, res) =>
    res.json({
      mensaje: "bienvenido",
    })
  );
  router.get("/propuestas/:id", propuestasController.mostrarPropuestas);
  router.get("/propuestas", propuestasController.idsPropuestas);

  return router;
};
