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
    let result = [];

    result = ingresarInventario(body, fechaHoyAux);

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

async function ingresarInventario(body, fechaHoyAux){

    let result = [];

    let inv_entrada = {};

    inv_entrada = {...inv_entrada, FECHA_INVENTARIO_ACTUAL: fechaHoyAux}

    for (let item in body) {
        //console.log(item, body[item]);
        inv_entrada = {...inv_entrada, [item]: body[item]}
      }

    result = await InventarioActual.updateOne(
        {
            FECHA_INVENTARIO_ACTUAL: fechaHoyAux
        }, 
        {
            $set: inv_entrada
            
        }, { upsert: true });

    return result;
}

module.exports = rute;