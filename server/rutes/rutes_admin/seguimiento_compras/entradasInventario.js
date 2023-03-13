const express = require('express');
const rute = express();
const InventarioEntrada = require('../../../models/inventario_insumos_entrantes');
const InventarioEntradaCosto = require('../../../models/inventario_insumos_entrantes_costo');

//GET traemos informacion del inventario
rute.get('/:fecha', (req, res) => {

    let fechaInventario = req.params.fecha;
    let result = [];

    result = LeerEntradasLeerCostos(fechaInventario);

    result
        .then(data => {
            res.json({
                inv_entrada: data
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
})

async function LeerEntradasLeerCostos(fechaInventario){    
    
    let result = [];

    result = await InventarioEntrada.find({FECHA_INVENTARIO_ENTRANTE: fechaInventario});

    let result_aux = [];

    for(let i=0;i<Object.keys(result[0]._doc).length;i++){
        if(Object.keys(result[0]._doc)[i] === "__v" || Object.keys(result[0]._doc)[i] === "INVENTARIO_AUX" || Object.keys(result[0]._doc)[i] === "_id" || Object.keys(result[0]._doc)[i] === "FECHA_INVENTARIO_ENTRANTE"){

        }else{
            if(Object.values(result[0]._doc)[i] === null){
                // Array.prototype.push.apply(result_aux, [{'Item': Object.keys(result[0]._doc)[i], 'Valor': 0 }])
            }else{
                Array.prototype.push.apply(result_aux, [{'Item': Object.keys(result[0]._doc)[i], 'Cantidad': Object.values(result[0]._doc)[i] }])
            }
        }        
    }

    let result_costos = [];

    result_costos = await InventarioEntradaCosto.find({FECHA_INVENTARIO_ENTRANTE_COSTO: fechaInventario});

    let result_costos_aux = [];

    for(let i=0;i<Object.keys(result_costos[0]._doc).length;i++){
        if(Object.keys(result_costos[0]._doc)[i] === "__v" || Object.keys(result_costos[0]._doc)[i] === "INVENTARIO_AUX" || Object.keys(result_costos[0]._doc)[i] === "_id" || Object.keys(result_costos[0]._doc)[i] === "FECHA_INVENTARIO_ENTRANTE_COSTO"){

        }else{
            if(Object.values(result_costos[0]._doc)[i] === null){
                // Array.prototype.push.apply(result_aux, [{'Item': Object.keys(result[0]._doc)[i], 'Valor': 0 }])
            }else{
                Array.prototype.push.apply(result_costos_aux, [{'Item': Object.keys(result_costos[0]._doc)[i], 'Valor': Object.values(result_costos[0]._doc)[i] }])
            }
        }        
    }

    console.log(result_aux)
    console.log(result_costos_aux)

    return {result, result_costos, result_aux, result_costos_aux}

}

//POST llenamos inventario
rute.post('/:fecha', (req, res) => {

    let fechaHoyAux = req.params.fecha;
    let body = req.body.INVENTARIO_FINAL_ENTRADAS;
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

    //console.log(body);

    let inv_entrada = {};

    inv_entrada = {...inv_entrada, FECHA_INVENTARIO_ENTRANTE: fechaHoyAux}

    for (let item in body) {
        //console.log(item, body[item]);
        inv_entrada = {...inv_entrada, [item.replace('ENTRADA_','')]: body[item]}
      }

    //console.log(inv_entrada);

    result = await InventarioEntrada.updateOne(
        {
            FECHA_INVENTARIO_ENTRANTE: fechaHoyAux
        }, 
        {
            $set: inv_entrada

        }, { upsert: true });

    return result;
}

module.exports = rute;