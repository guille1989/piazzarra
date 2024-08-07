const express = require('express');
const rute = express();
const InventarioEntrada = require('../../../models/inventario_insumos_entrantes');

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

    result = await InventarioEntrada.find({FECHA_INVENTARIO_ENTRANTE: fechaInventario});

    return result

}

//POST llenamos inventario
rute.post('/:fecha', (req, res) => {

    let fechaHoyAux = req.params.fecha;
    let body = req.body.INVENTARIO_FINAL_ENTRADAS;
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

    //console.log(body);

    let inv_entrada = {};

    inv_entrada = {...inv_entrada, FECHA_INVENTARIO_ENTRANTE: fechaHoyAux}

    inv_entrada = {...inv_entrada, "INVENTARIO_ID": inv_id}


    for (let item in body) {
        //console.log(item, body[item]);
        inv_entrada = {...inv_entrada, [item.replace('ENTRADA_','')]: body[item]}
      }

    let inventario_input = {"INVENTARIO_AUX" : inv_entrada}

    result = await InventarioEntrada.updateOne(
        {
            $and: [
                {"FECHA_INVENTARIO_ENTRANTE": fechaHoyAux},
                {"INVENTARIO_AUX.INVENTARIO_ID": inv_id}
            ]
        }, 
        {
            $set: inventario_input

        }, { upsert: true });

    return result;
}

module.exports = rute;