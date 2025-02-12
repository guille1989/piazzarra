const Express = require("express");
const rute = Express();
const PedidoPizzarra = require("../../../models/pizzarra_ventas");

rute.get("/:fechaUno/:fechaDos/:local", async (req, res) => {
  let fechaInicio = req.params.fechaUno;
  let fechaFin = req.params.fechaDos;
  let local = req.params.local;
  //Query que retorna tiquet medio y cantidad de ventas
  let matchQuery = {
    "aux.fecha_pedido": {
      $gte: fechaInicio,
      $lte: fechaFin,
    },
  };
  if (local !== "todos") {
    matchQuery["aux.local"] = local;
  }
  try {
    const result_ventas_aux = await PedidoPizzarra.aggregate([
      {
        $unwind: "$aux",
      },
      {
        $match: matchQuery
      },
      {
        $group: {
          _id: null,
          totalVentas: {
            $sum: "$aux.costo_pedido",
          },
          totalPedidosMesa: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          ticketMedio: {
            $divide: ["$totalVentas", "$totalPedidosMesa"],
          },
          totalVentas: 1,
          totalPedidosMesa: 1,
        },
      },
    ]);

    res.status(200).json({
      tiquet_medio: result_ventas_aux,
    });
  } catch (error) {
    res.status(500).send("Error en la consulta: " + error);
  }
});

module.exports = rute;
