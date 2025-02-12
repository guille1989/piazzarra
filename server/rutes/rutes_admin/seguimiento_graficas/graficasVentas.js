const Express = require("express");
const rute = Express();
const PedidoPizzarra = require("../../../models/pizzarra_ventas");

//GET
rute.get("/:fechaUno/:fechaDos/:local", (req, res) => {
  let fecha_uno_aux = req.params.fechaUno;
  let fecha_dos_aux = req.params.fechaDos;
  let local = req.params.local;

  let result = [];
  result = leerVentasSemana(fecha_uno_aux, fecha_dos_aux, local);

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

async function leerVentasSemana(fecha_uno_aux, fecha_dos_aux, local) {
  let count_domicilios = 0;
  let count_mesa = 0;
  let count_recogen = 0;
  let result_sum_ventas_acum = 0;

  let matchQuery = {
    "aux.fecha_pedido": {
      $gte: fecha_uno_aux,
      $lte: fecha_dos_aux,
    },
  };

  let matchRecogenQuery = {
    "aux.fecha_pedido": {
      $gte: fecha_uno_aux,
      $lte: fecha_dos_aux,
    },
    "aux.tipo_pedido": "RECOGEN",
  };

  let matchMesaQuery = {
    "aux.fecha_pedido": {
      $gte: fecha_uno_aux,
      $lte: fecha_dos_aux,
    },
    "aux.tipo_pedido": "MESA",
  };

  let matchDomicilioQuery = {
    "aux.fecha_pedido": {
      $gte: fecha_uno_aux,
      $lte: fecha_dos_aux,
    },
    "aux.tipo_pedido": "DOMICILIO",
  };

  if (local !== "todos") {
    matchQuery["aux.local"] = local;
    matchRecogenQuery["aux.local"] = local;
    matchMesaQuery["aux.local"] = local;
    matchDomicilioQuery["aux.local"] = local;
  }

  let resut_ventas_totales01 = await PedidoPizzarra.aggregate([
    {
      $match: matchQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: local,
        suma_ventas_totales: {
          $sum: "$aux.costo_pedido",
        },
      },
    },
  ]);

  let result04 = await PedidoPizzarra.aggregate([
    {
      $match: matchQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: "$aux.fecha_pedido",
        suma_ventas: {
          $sum: "$aux.costo_pedido",
        },
        total_pedidos: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 1,
        suma_ventas: 1,
        total_pedidos: 1,
        tiquet_medio: { $divide: ["$suma_ventas", "$total_pedidos"] },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  let resultVentasMes = await PedidoPizzarra.aggregate([
    {
      $match: matchQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: {
          $substr: ["$aux.fecha_pedido", 0, 7],
        },
        totalVentas: {
          $sum: "$aux.costo_pedido",
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  let resultHorasPedidos = await PedidoPizzarra.aggregate([
    {
      $match: matchQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: null,
        horas_pedido: {
          $addToSet: "$aux.hora_pedido",
        },
      },
    },
    {
      $project: {
        _id: 0,
        horas_pedido: 1,
      },
    },
  ]);

  // Extraer y redondear a la hora
  const horasChartData = [];
  resultHorasPedidos[0].horas_pedido.map((hora) => {
    horasChartData.push({
      y: parseInt(hora.split(":")[0], 10),
    });
  });

  let result06_tipo = await PedidoPizzarra.aggregate([
    {
      $match: matchMesaQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: "numero_pedidos_mesa",
        suma_ventas: {
          $sum: "$aux.costo_pedido",
        },
        suma: {
          $sum: 1,
        },
      },
    },
  ]);

  let result07_tipo = await PedidoPizzarra.aggregate([
    {
      $match: matchDomicilioQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: "numero_pedidos_domicilio",
        suma_ventas: {
          $sum: "$aux.costo_pedido",
        },
        suma: {
          $sum: 1,
        },
      },
    },
  ]);

  let result08_tipo = await PedidoPizzarra.aggregate([
    {
      $match: matchRecogenQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: "numero_pedidos_recogen",
        suma_ventas: {
          $sum: "$aux.costo_pedido",
        },
        suma: {
          $sum: 1,
        },
      },
    },
  ]);

  let result09_ventas_tipo = await PedidoPizzarra.aggregate([
    {
      $match: matchQuery,
    },
    {
      $unwind: "$aux",
    },
    {
      $group: {
        _id: "$aux.tipo_pedido",
        numero_de_ventas: {
          $sum: 1,
        },
        valor_total: {
          $sum: "$aux.costo_pedido",
        },
      },
    },
    {
      $sort: { valor_total: -1 }, // Ordenar por valor_total en orden descendente
    },
  ]);

  let tipo_pedido = [];

  if (result06_tipo.length === 0) {
    tipo_pedido.push({ x: "Mesa", y: 0, text: `Pedidos Mesa: 0` });
  } else {
    tipo_pedido.push({
      x: "Mesa",
      y: result06_tipo[0].suma,
      z: result06_tipo[0].suma_ventas,
      text: `Pedidos Mesa: ${result06_tipo[0].suma}`,
    });
  }

  if (result07_tipo.length === 0) {
    tipo_pedido.push({ x: "Domicilio", y: 0, text: `Pedidos Domicilio: 0` });
  } else {
    tipo_pedido.push({
      x: "Domicilio",
      y: result07_tipo[0].suma,
      z: result07_tipo[0].suma_ventas,
      text: `Pedidos Domicilio: ${result07_tipo[0].suma}`,
    });
  }

  if (result08_tipo.length === 0) {
    tipo_pedido.push({ x: "Recogen", y: 0, text: `Pedidos Recogen: 0` });
  } else {
    tipo_pedido.push({
      x: "Recogen",
      y: result08_tipo[0].suma,
      z: result08_tipo[0].suma_ventas,
      text: `Pedidos Recogen: ${result08_tipo[0].suma}`,
    });
  }

  if (resut_ventas_totales01.length === 0) {
    resut_ventas_totales01 = [{ _id: local, suma_ventas_totales: 0 }];
  }

  return {
    result04,
    resut_ventas_totales01,
    tipo_pedido,
    result09_ventas_tipo,
    resultVentasMes,
    horasChartData,
    result06_tipo,
    result07_tipo,
    result08_tipo,
  };
}

module.exports = rute;
