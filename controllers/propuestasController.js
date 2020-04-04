const CSVToJSON = require("csvtojson");
const puppeteer = require("puppeteer");

// Muestra todos los productos
exports.mostrarPropuestas = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  const id = req.params.id;
  // creo el navegador
  const browser = await puppeteer.launch();
  // abro la pagina que deseo analizar y capturar informacion
  const page = await browser.newPage();
  async function getPageData() {
    await page.goto(
      `https://www.grants.gov/custom/viewOppDetails.jsp?oppId=${id}`
    );
    await setTimeout(async () => {
      const data = await page.evaluate(async () => {
        //Analisis de la seccion General Information
        const $detallesIzq = document.querySelectorAll(
          "#synopsisDetailsGeneralInfoTableLeft > table > tbody >tr"
        );
        const $detallesDer = document.querySelectorAll(
          "#synopsisDetailsGeneralInfoTableRight > table > tbody >tr"
        );
        const data = [];
        // recorro los detalles de la izquiera
        await $detallesIzq.forEach(($detalle) => {
          data.push({
            titulo: $detalle.querySelector(".label").textContent.trim(),
            contenido: $detalle
              .querySelector(".search-custom")
              .textContent.trim(),
          });
        });
        // recorro los detalles de la derecha
        await $detallesDer.forEach(($detalle) => {
          data.push({
            titulo: $detalle.querySelector(".label").textContent.trim(),
            contenido: $detalle
              .querySelector(".search-custom")
              .textContent.trim(),
          });
        });

        // Analisis de la segunda seccion

        const $detallesElegibility = document.querySelectorAll(
          "#synopsisDetailsEligibilityTable > table > tbody >tr"
        );

        const elegibility = [];
        await $detallesElegibility.forEach(($detalle) => {
          elegibility.push({
            titulo: $detalle.querySelector(".label").textContent.trim(),
            contenido: $detalle
              .querySelector(".search-custom")
              .textContent.trim(),
          });
        });

        // Analisis tercera seccion
        const $detallesAdditionalInformation = document.querySelectorAll(
          "#synopsisDetailsAdditionalInfoTable > table > tbody >tr"
        );

        const additionalInformation = [];
        await $detallesAdditionalInformation.forEach(($detalle) => {
          additionalInformation.push({
            titulo: $detalle.querySelector(".label").textContent.trim(),
            contenido: $detalle
              .querySelector(".search-custom")
              .textContent.trim(),
          });
        });

        return {
          generalInfo: data,
          elegibility,
          additionalInformation,
        };
      });
      res.json(data);
    }, 2000);
  }

  await getPageData();
  await setTimeout(() => {
    browser.close();
  }, 30000);
};
exports.idsPropuestas = async (req, res) => {
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
  const nuevosDatos = datos.reverse();
  res.json(nuevosDatos.splice(-100));
};
