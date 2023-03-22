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
    let inv_id = req.body.INVENTARIO_ID;
    let result = [];

    result = ingresarEntradas(body, fechaHoyAux, inv_id);

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

async function ingresarEntradas(body, fechaHoyAux, inv_id){

    let result = [];

    let inv_entrada = {};

    inv_entrada = {...inv_entrada, FECHA_INVENTARIO_ENTRANTE_COSTO: fechaHoyAux}

    inv_entrada = {...inv_entrada, "INVENTARIO_ID": inv_id}

    for (let item in body) {
        //console.log(item, body[item]);
        inv_entrada = {...inv_entrada, [item.replace('COSTO_','')]: body[item]}
      }

    let inventario_input = {"INVENTARIO_AUX" : inv_entrada}

    result = await InventarioEntradaCostos.updateOne(
        {
            FECHA_INVENTARIO_ENTRANTE_COSTO: fechaHoyAux
        }, 
        {
            $set: inventario_input

        }, { upsert: true });

    return result;
}

module.exports = rute;