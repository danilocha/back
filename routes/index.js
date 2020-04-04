const express = require("express");
const router = express.Router();
const propuestasController = require("../controllers/propuestasController");

module.exports = () => {
  // Mostrar todos los productos
  router.get("/propuestas/:id", propuestasController.mostrarPropuestas);
  router.get("/ids", propuestasController.idsPropuestas);

  return router;
};