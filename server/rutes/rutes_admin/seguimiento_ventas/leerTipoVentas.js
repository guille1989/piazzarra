const Express = require("express");
const rute = Express();
const PedidoPizzarra = require("../../../models/pizzarra_ventas");

//GET traemos ventas por tipo
rute.get("/:fecha_inicial/:fecha_final/:pizzarraid", (req, res) => {
  let fecha_inicial = req.params.fecha_inicial;
  let fecha_final = req.params.fecha_final;
  let pedidos_pizzarra_id = req.params.pizzarraid;
  result = leerVentasPorTipo(pedidos_pizzarra_id, fecha_inicial, fecha_final);

  result
    .then((msj) => {
      res.json({
        ventas_tipo: msj,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

async function leerVentasPorTipo(
  pedidos_pizzarra_id,
  fecha_inicial,
  fecha_final
) {
  let result = [];

  let matchQuery = {
    "aux.fecha_pedido": {
      $gte: fecha_inicial,
      $lte: fecha_final,
    },
  };

  if (pedidos_pizzarra_id !== "todos") {
    matchQuery["aux.local"] = pedidos_pizzarra_id;
  }

  result = await PedidoPizzarra.aggregate([
    [
      {
        $match: matchQuery,
      },
      {
        $unwind: "$pedido",
      },
      {
        $project: {
          tipo_limpio: {
            $trim: {
              input: "$pedido.tipo",
            },
          },
          coincidencias: {
            $filter: {
              input: [
                "$pedido.sabor_grande",
                "$pedido.mitad_uno",
                "$pedido.mitad_dos",
                "$pedido.cuarto_uno",
                "$pedido.cuarto_dos",
                "$pedido.cuarto_tres",
                "$pedido.cuarto_cuatro",
                "$pedido.sabor_personal",
                "$pedido.sabor_lasagna",
                "$pedido.sabor_pancook",
                "$pedido.sabor_pantalon",
                "$pedido.sabor_ravioli",
                "$pedido.sabor_sopa",
                "$pedido.sabor_pasta",
              ],
              as: "sabor",
              cond: {
                $or: [
                  {
                    $in: [
                      "$$sabor",
                      [
                        "MIXTA",
                        "HAWAIANA",
                        "HIGOSTOCINETA",
                        "POLLOCHAMPI",
                        "JAMONCHAMPI",
                        "SAMBA",
                        "PETETE",
                        "CAMPESINA",
                        "NAPOLITANA",
                        "MARGARITA",
                        "GOURMET",
                        "PADRISIMA",
                        "VEGETARIANA",
                        "FESTIVAL",
                        "BOLOGNESA",
                        "CARBONARA",
                        "DESAYUNO",
                      ],
                    ],
                  },
                  {
                    $regexMatch: {
                      input: "$$sabor",
                      regex: new RegExp(
                        "Combinada 2 Ingredientes:|Combinada 3 Ingredientes:"
                      ),
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          combinados: {
            $concatArrays: [["$tipo_limpio"], "$coincidencias"],
          },
        },
      },
    ],
  ]);

  //Procesamos los resultados, agrupamos en categorias unicas
  // Extraer los valores de combinados[0]
  const primerosCombinados = result.map((item) => {
    if (item.combinados[0].includes("X")) {
      return item.combinados[0].split("X")[0];
    } else {
      return item.combinados[0];
    }
  });

  // Contar las ocurrencias únicas
  const conteoUnico = primerosCombinados.reduce((contador, valor) => {
    contador[valor] = (contador[valor] || 0) + 1;
    return contador;
  }, {});

  // Contar las ocurrencias únicas para los valores del objeto en combinados[1] y combinados[2] o combinados[n]
  result.forEach((item) => {
    for (let i = 1; i < item.combinados.length; i++) {
      let key;
      if (item.combinados[i].includes("X")) {
        key = item.combinados[i].split("X")[0];
      } else {
        key = item.combinados[i];
      }
      // Asegúrate de que la clave sea una cadena de texto
      key = String(key).trim();
      conteoUnico[key] = (conteoUnico[key] || 0) + 1;
    }
  });

  // Usar la función genérica para diferentes claves
  const conteoUnicoPizzaPastaLasagna = contarOcurrencias(result, [
    "PIZZA",
    "PASTA",
    "LASAGNA",
  ]);
  const conteoUnicoPizza = contarOcurrencias(result, ["PIZZA"]);
  const conteoUnicoPasta = contarOcurrencias(result, ["PASTA"]);
  const conteoUnicoLasagna = contarOcurrencias(result, ["LASAGNA"]);
  const conteoUnicoBebidas = contarOcurrencias(result, [
    "BEBIDA",
    "GASEOSA",
    "CERVEZA",
    "VINO",
    "JUGO",
    "Tinto",
  ]);
  const conteoUnicoPanaderia = contarOcurrencias(result, ["PAN ", "MASAS"]);
  const conteoUnicoDesayuno = contarOcurrencias(result, ["DESAYUNO"]);

  const conteoUnicoPizzaPastaLasagnaSabores = conteoUnicoPizzaPastaLasagna["s"];

  const conteoUnicoPizzaPastaLasagnaSaboresArray = Object.entries(
    conteoUnicoPizzaPastaLasagnaSabores
  ).map(([key, value]) => ({
    X: key,
    Y: value,
  }));

  // Ordenar el array de mayor a menor en función de Y
  const conteoUnicoPizzaPastaLasagnaSaboresArraySorted =
  conteoUnicoPizzaPastaLasagnaSaboresArray.sort((a, b) => b.Y - a.Y);

  const top10ConteoUnicoPizzaPastaLasagnaSaboresArray = conteoUnicoPizzaPastaLasagnaSaboresArraySorted.slice(0, 10);


  // Procesar conteoUnicoLasagna para agrupar y sumar las ocurrencias solo teniendo en cuenta los dos primeros strings
  const conteoUnicoLasagnaAgrupado = Object.entries(conteoUnicoLasagna).reduce(
    (acc, [key, value]) => {
      const keyParts = key.split(" ");
      const groupedKey = keyParts.slice(0, 2).join(" ");
      acc[groupedKey] = (acc[groupedKey] || 0) + value;
      return acc;
    },
    {}
  );

  // Convertir conteoUnicoPizzaAgrupado en un array de objetos con las propiedades X y Y
  const conteoUnicoLasagnaAgrupadoArray = Object.entries(
    conteoUnicoLasagnaAgrupado
  ).map(([key, value]) => ({
    X: key,
    Y: value,
  }));

  // Procesar conteoUnicoPasta para agrupar y sumar las ocurrencias solo teniendo en cuenta los dos primeros strings
  const conteoUnicoPastaAgrupado = Object.entries(conteoUnicoPasta).reduce(
    (acc, [key, value]) => {
      const keyParts = key.split(" ");
      const groupedKey = keyParts.slice(0, 3).join(" ");
      acc[groupedKey] = (acc[groupedKey] || 0) + value;
      return acc;
    },
    {}
  );

  // Convertir conteoUnicoPizzaAgrupado en un array de objetos con las propiedades X y Y
  const conteoUnicoPastaAgrupadoArray = Object.entries(
    conteoUnicoPastaAgrupado
  ).map(([key, value]) => ({
    X: key,
    Y: value,
  }));

  // Procesar conteoUnicoPizza para agrupar y sumar las ocurrencias solo teniendo en cuenta los dos primeros strings
  const conteoUnicoPizzaAgrupado = Object.entries(conteoUnicoPizza).reduce(
    (acc, [key, value]) => {
      const keyParts = key.split(" ");
      const groupedKey = keyParts.slice(0, 2).join(" ");
      acc[groupedKey] = (acc[groupedKey] || 0) + value;
      return acc;
    },
    {}
  );

  // Convertir conteoUnicoPizzaAgrupado en un array de objetos con las propiedades X y Y
  const conteoUnicoPizzaAgrupadoArray = Object.entries(
    conteoUnicoPizzaAgrupado
  ).map(([key, value]) => ({
    X: key,
    Y: value,
  }));

  // Combinar los arrays en un solo array
  const combinedUnicoAgrupadoArray = [
    ...conteoUnicoLasagnaAgrupadoArray,
    ...conteoUnicoPastaAgrupadoArray,
    ...conteoUnicoPizzaAgrupadoArray,
  ];

  // Eliminar los objetos con la clave X igual a "s"
  const combinedUnicoAgrupadoArrayFilter = combinedUnicoAgrupadoArray.filter(
    (item) => item.X !== "s"
  );

  // Ordenar el array de mayor a menor en función de Y
  const combinedUnicoAgrupadoArraySorted =
    combinedUnicoAgrupadoArrayFilter.sort((a, b) => b.Y - a.Y);

  return {
    result,
    conteoUnico,
    conteoUnicoPizza,
    conteoUnicoPizzaAgrupado,
    conteoUnicoPizzaAgrupadoArray,
    conteoUnicoPasta,
    conteoUnicoPastaAgrupado,
    conteoUnicoPastaAgrupadoArray,
    conteoUnicoLasagna,
    conteoUnicoLasagnaAgrupado,
    conteoUnicoLasagnaAgrupadoArray,
    conteoUnicoBebidas,
    conteoUnicoPanaderia,
    conteoUnicoDesayuno,
    combinedUnicoAgrupadoArraySorted,
    conteoUnicoPizzaPastaLasagna,
    conteoUnicoPizzaPastaLasagnaSaboresArraySorted,
    top10ConteoUnicoPizzaPastaLasagnaSaboresArray
  };
}

// Función genérica para contar ocurrencias únicas
function contarOcurrencias(result, keyFilter) {
  // Separar los resultados en un array donde solo contenga el string keyFilter en combinados[0]
  const filteredItems = result.filter((item) =>
    keyFilter.some((key) => item.combinados[0].includes(key))
  );

  // Contar las ocurrencias únicas
  const conteoUnico = filteredItems.reduce((contador, valor) => {
    let contadorAux = 0;
    let valorContador;
    if (valor.combinados[0].includes("X")) {
      contadorAux = parseInt(valor.combinados[0].split("X")[1].trim());
      valorContador = valor.combinados[0].split("X")[0].trim();
      contador[valorContador] = (contador[valorContador] || 0) + contadorAux;
    } else {
      valorContador = valor.combinados[0];
      contador[valorContador] =
        (contador[valorContador] || 0) + 1 + contadorAux;
    }
    return contador;
  }, {});

  // Contar las ocurrencias únicas para los valores del objeto en combinados[1] y combinados[2] o combinados[n]
  conteoUnico["s"] = {};
  filteredItems.forEach((item) => {
    for (let i = 1; i < item.combinados.length; i++) {
      let key = item.combinados[i];
      // Asegúrate de que la clave sea una cadena de texto
      key = String(key).trim();
      conteoUnico["s"][key] = (conteoUnico["s"][key] || 0) + 1;
    }
  });

  return conteoUnico;
}

module.exports = rute;
