const express = require('express');
const rute = express();
const InventarioEntradaCostos = require('../../../models/inventario_insumos_entrantes_costo');

//GET traemos informacion del inventario
rute.get('/:fecha', (req, res) => {

    let fechaInventario = req.params.fecha;
    let result = [];

    result = IngresarEntradas(fechaInventario);

    result
        .then(data => {
            res.json({
                inv: data,
                msj: 'Inventario ingresado OK !'
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
})

async function IngresarEntradas(fechaInventario){    
    
    let result = [];

    result = await InventarioEntradaCostos.find({FECHA_INVENTARIO_ENTRANTE_COSTO: fechaInventario});

    return result

}

//POST llenamos inventario
rute.post('/:fecha', (req, res) => {

    let fechaHoyAux = req.params.fecha;
    let body = req.body.INVENTARIO_FINAL_ENTRADAS_COSTO;
    let result = [];

    result = ingresarEntradas(body, fechaHoyAux);

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

async function ingresarEntradas(body, fechaHoyAux){

    let result = [];

    let inv_entrada = {};

    inv_entrada = {...inv_entrada, FECHA_INVENTARIO_ENTRANTE: fechaHoyAux}

    for (let item in body) {
        //console.log(item, body[item]);
        inv_entrada = {...inv_entrada, [item.replace('COSTO_','')]: body[item]}
      }

    result = await InventarioEntradaCostos.updateOne(
        {
            FECHA_INVENTARIO_ENTRANTE_COSTO: fechaHoyAux
        }, 
        {
            $set: inv_entrada

        }, { upsert: true });

    return result;
}

module.exports = rute;