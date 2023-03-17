const express = require('express');
const rute = express();
const InventarioActual = require('../../../../models/inventarios_insumos_actuales');

//GET traemos informacion del inventario
rute.get('/:fecha/:fechaayer', (req, res) => {

    let fechaInventario = req.params.fecha;
    let fechaInventarioAyer = req.params.fechaayer;
    let result = [];

    result = leerInventario(fechaInventario, fechaInventarioAyer);

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

async function leerInventario(fechaInventario, fechaInventarioAyer){    
    
    let result = [];
    let result_ayer = [];

    //console.log(fechaInventario, fechaInventarioAyer)

    result = await InventarioActual.find({FECHA_INVENTARIO_ACTUAL: fechaInventario});
    result_ayer = await InventarioActual.find({FECHA_INVENTARIO_ACTUAL: fechaInventarioAyer});

    //console.log(result[0]._doc.INVENTARIO_AUX)   
    //console.log(result_ayer[0]._doc.INVENTARIO_AUX)   
    
    return {result, result_ayer}
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