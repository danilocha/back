const express = require("express");
const routes = require("./routes");

require("dotenv").config({ path: "variables.env" });

// CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require("cors");

// crear el servidor
const app = express();

//Definir un dominio en especifico
const whitelist = ["https://heuristic-goldstine-ec1837.netlify.com"];
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
app.use(cors(corsOptions));

app.use("/", cors(corsOptions), routes());

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

//puerto
app.listen(port, host, () => {
  console.log("el servidor esta funcionando");
});
