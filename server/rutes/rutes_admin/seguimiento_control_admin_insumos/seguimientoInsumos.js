const express = require("express");
const rute = express();
const Insumos = require("../../../models/insumos");
const InventarioActual = require("../../../models/inventarios_insumos_actuales");
const InventarioEntradas = require("../../../models/inventario_insumos_entrantes");
const InventarioVentas = require("../../../models/pizzarra_ventas");
const PedidoPizzarra = require("../../../models/pizzarra_ventas");
const resultVentasPeriodo = require("../../../utils/resultCuadreInventarios");
const filterArray = require("../../../utils/functionsUtils");
const getArrayRangeDates = require("../../../utils/functionReturnRangeArraydates");

//GET traemos informacion del inventario
rute.get("/:fechaInicial/:fechaFinal", (req, res) => {
  const resultSeguimientoInsumos = [];

  let fechaInicial = req.params.fechaInicial;
  let fechaFinal = req.params.fechaFinal;

  let inv_id = "Pizzarra-Popayan-Centro";
  let pedidos_id = "Popayan-Centro";

  let result = seguimientoInsumos(fechaInicial, fechaFinal, inv_id, pedidos_id, resultSeguimientoInsumos);

  result
    .then((msj) => {
      res.json({
        inv: msj,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

async function seguimientoInsumos(
  fechaInicial,
  fechaFinal,
  inv_id,
  pedidos_id,
  resultSeguimientoInsumos
) {
  try {
    // Obtener valores únicos de INSUMO_TIPO
    const tiposInsumos = await Insumos.distinct("INSUMO_TIPO");

    // Generar array de fechas
    const arrayFechas = getArrayRangeDates(fechaInicial, fechaFinal);

    // Procesar cada tipo de insumo
    await Promise.all(
      tiposInsumos.map(async (tipoInsumo) => {
        const insumos = await Insumos.find({ INSUMO_TIPO: tipoInsumo });

        const insumosTiposArray = insumos.map((insumo) => insumo.TIPO);

        const result = await procesarFechas(
          arrayFechas,
          inv_id,
          pedidos_id,
          insumos,
          insumosTiposArray
        );   
        resultSeguimientoInsumos.push({result, tipoInsumo});
      })
    );
    resultSeguimientoInsumos.push({arrayFechas});
    return resultSeguimientoInsumos;
  } catch (error) {
    console.error("Error en el seguimiento de insumos:", error);
    res.status(500).send("Error en el seguimiento de insumos.");
  }
}

async function procesarFechas(
  arrayFechas,
  inv_id,
  pedidos_id,
  result_insumo_tipos,
  result_insumos_tipos_array
) {
  let resultadosTotales = [];
  let acumuladorCuadreArray = Array(result_insumo_tipos.length).fill(0);

  let promesas = arrayFechas.map(async (fecha) => {
    let fechaActual = new Date(fecha);
    fechaActual.setDate(fechaActual.getDate() - 1);
    let diaAnterior = fechaActual.toISOString().split("T")[0];

    let result_output = [];
    let result_outputAUX = [];
    let result_inventario_actual = [];
    let result_ayer = [];
    let result_entradas = [];
    let result_ventas_aux = [];
    let inv_ceros_aux = [];

    //CONSULTAS MONGO
    result_inventario_actual = await InventarioActual.find({
      $and: [
        { FECHA_INVENTARIO_ACTUAL: fecha },
        { "INVENTARIO_AUX.INVENTARIO_ID": inv_id },
      ],
    });
    result_ayer = await InventarioActual.find({
      $and: [
        { FECHA_INVENTARIO_ACTUAL: diaAnterior },
        { "INVENTARIO_AUX.INVENTARIO_ID": inv_id },
      ],
    });
    result_entradas = await InventarioEntradas.find({
      $and: [
        { FECHA_INVENTARIO_ENTRANTE: fecha },
        { "INVENTARIO_AUX.INVENTARIO_ID": inv_id },
      ],
    });
    result_ventas_aux = await PedidoPizzarra.find({
      $and: [{ "aux.fecha_pedido": fecha }, { "aux.local": pedidos_id }],
    });

    //FILTROS DINAMICOS
    let insumosFiltradosActual = filterArray(
      result_inventario_actual[0].INVENTARIO_AUX,
      result_insumos_tipos_array
    );
    let insumosFiltradosAyer = filterArray(
      result_ayer[0].INVENTARIO_AUX,
      result_insumos_tipos_array
    );
    let insumosFiltradosEntradas = filterArray(
      result_entradas[0].INVENTARIO_AUX,
      result_insumos_tipos_array
    );

    result_insumo_tipos.map((item, index) => {
      let item_aux = item.TIPO;
      inv_ceros_aux = { ...inv_ceros_aux, [item_aux]: 0 };
    });
    let result_ventas_filter_aux = resultVentasPeriodo(
      result_ventas_aux,
      result_insumo_tipos,
      result_insumos_tipos_array
    );

    result_insumo_tipos.map((item, index) => {
      cuadreInventario =
        parseInt(insumosFiltradosActual[0][item.TIPO]) -
        parseInt(insumosFiltradosAyer[0][item.TIPO]) -
        parseInt(insumosFiltradosEntradas[0][item.TIPO]) -
        parseInt(result_ventas_filter_aux[0][item.TIPO]);

      result_output.push({
        TIPO: item.TIPO,
        INV_CUADRE: cuadreInventario,
      });

      acumuladorCuadreArray[index] =
        acumuladorCuadreArray[index] + cuadreInventario;
    });
  });

  await Promise.all(promesas);

  result_insumo_tipos.map((item, index) => {
    resultadosTotales.push({
      TIPO: item.TIPO,
      INV_CUADRE: acumuladorCuadreArray[index],
    });
  });

  return resultadosTotales;
}

module.exports = rute;
