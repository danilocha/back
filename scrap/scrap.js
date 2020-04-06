const puppeteer = require("puppeteer");
const fs = require("fs");
const funcion = async () => {
  const jsonIds = require("./archivo.json");
  jsonIds.map(async (pagina) => {
    const id = pagina.id;
    // creo el navegador
    const browser = await puppeteer.launch();
    // abro la pagina que deseo analizar y capturar informacion
    const page = await browser.newPage();
    async function getPageData() {
      await page.goto(
        `https://www.grants.gov/custom/viewOppDetails.jsp?oppId=${id}`
      );

      await setTimeout(async () => {
        const arregloFinal = [];
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
        //Trae el json actual
        const documento = require("./oportunidades.json");
        console.log(documento);
        // el nuevo objeto
        const nombre = [{ id, data }];
        // agrega el nuevo objeto al arreglo
        documento.push(nombre);
        //actualiza el json
        fs.writeFile(
          "oportunidades.json",
          JSON.stringify(documento),
          "utf8",
          (err) => {
            if (err) throw err;
            console.log("los datos, fueron guardados");
          }
        );
      }, 2000);
    }
    // await console.log(arregloFinal);
    await getPageData();
    await setTimeout(() => {
      browser.close();
    }, 10000);
  });

  //   console.log(jsonIds);
};
funcion();
