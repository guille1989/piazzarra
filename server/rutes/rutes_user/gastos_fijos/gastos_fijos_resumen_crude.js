const express = require("express");
const rute = express();
const GastosFijos = require("../../../models/gastos_fijos");
const GastosFijosPizzarras = require("../../../models/gastos_fijos_pizzarras");
const { ObjectId } = require('mongodb');

//GET traemos gastos fijos para el periodo seleccionado
rute.get("/:mes/:anno/:local", (req, res) => {
  let fecha_periodo = req.params.mes + "-" + req.params.anno;
  let local = req.params.local;
  let result = [];

  result = leerGastosFijos(fecha_periodo, local);

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

//DELETE para eliminar un gasto fijo
rute.delete("/:id/:idElemento/:descripcion", (req, res) => {
  let result = [];
  let id = req.params.id;
  let idElemento = req.params.idElemento;
  let descripcion = req.params.descripcion;
  result = eliminarGastoFijo(id, idElemento, descripcion);

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

async function leerGastosFijos(fecha_periodo, local) {
  let result = [];

  console.log("Leyendo gastos fijos para el periodo", fecha_periodo);

  result = await GastosFijosPizzarras.find({ FECHA_GASTO_fIJO: fecha_periodo, LOCAL: local });

  return result;
}

async function eliminarGastoFijo(id, idElemento, descripcion) {

  try {
    let result = await GastosFijosPizzarras.updateOne(
      { _id: ObjectId(id) },
      { $pull: { GASTOS: { id: parseInt(idElemento, 10), descripcion: descripcion } } }
    );
    console.log("Resultado de la eliminación:", result);

    // Verifica si el array GASTOS está vacío
    const documento = await GastosFijosPizzarras.findOne({ _id: ObjectId(id) });
    if (documento && documento.GASTOS.length === 0) {
      // Elimina el documento completo si el array GASTOS está vacío
      await GastosFijosPizzarras.deleteOne({ _id: ObjectId(id) });
      console.log("Documento eliminado porque el array GASTOS está vacío");
    }
    
    return result;
  } catch (err) {
    console.error("Error al eliminar el gasto fijo:", err);
    throw err;
  }
}

module.exports = rute;
