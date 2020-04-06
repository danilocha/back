const CSVToJSON = require("csvtojson");
const fs = require("fs");
const funcion = async () => {
  const datos = [];
  await CSVToJSON()
    .fromFile("./links.csv")
    .then((source) => {
      source.splice(0).map((data) => {
        const texto = Object.values(data);
        const elementos = texto[0].split("=");
        const casiId = elementos[2].split('"');
        const id = casiId[0];
        datos.push({
          id,
          entidad: texto[3],
        });
      });
    });
  fs.writeFile(
    "archivo.json",
    JSON.stringify(datos.reverse().splice(-30)),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log("los ids, fueron guardados");
    }
  );
};
funcion();
