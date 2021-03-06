const express = require("express");
const routes = require("./routes");

require("dotenv").config({ path: "variables.env" });

// CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require("cors");

// crear el servidor
const app = express();

//Definir un dominio en especifico
const whitelist = "*";
const corsOptions = {
  origin: (origin, callback) => {
    // revisar si la peticion viene de un servidor que esta en la whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
//CORS habilitar
// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/", routes());

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

//puerto
app.listen(port, host, () => {
  console.log(`el servidor esta funcionando ${host}/${port}`);
});
