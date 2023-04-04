const express = require('express');
const rute = express();
const InventarioActual = require('../../../models/inventarios_insumos_actuales');

//GET traemos informacion del inventario
rute.get('/:fecha', (req, res) => {

    let fechaInventario = req.params.fecha;
    let result = [];

    result = leerInventario(fechaInventario);

    result
        .then(msj => {
            res.json({
                inv: msj
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
})

async function leerInventario(fechaInventario){    
    
    let result = [];

    result = await InventarioActual.find({FECHA_INVENTARIO_ACTUAL: fechaInventario});

    return result

}

//POST llenamos inventario
rute.post('/:fecha', (req, res) => {

    let fechaHoyAux = req.params.fecha;
    let body = req.body.INVENTARIO_FINAL;
    let inv_id = req.body.INVENTARIO_ID;
    let result = [];

    result = ingresarInventario(body, fechaHoyAux, inv_id);

    result
        .then(msj => {
            res.json({
                inv: msj
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
})

async function ingresarInventario(body, fechaHoyAux, inv_id){

    let result = [];

    let inv_entrada = {};

    inv_entrada = {...inv_entrada, FECHA_INVENTARIO_ACTUAL: fechaHoyAux}

    inv_entrada = {...inv_entrada, "INVENTARIO_ID": inv_id}

    for (let item in body) {
        //console.log(item, body[item]);
        inv_entrada = {...inv_entrada, [item]: body[item]}
      }

    let inventario_input = {"INVENTARIO_AUX" : inv_entrada}

    result = await InventarioActual.updateOne(
        {
            $and: [
                {"FECHA_INVENTARIO_ACTUAL": fechaHoyAux},
                {"INVENTARIO_AUX.INVENTARIO_ID": inv_id}
            ]
        }, 
        {
            $set: inventario_input
            
        }, { upsert: true });

    return result;
}

module.exports = rute;