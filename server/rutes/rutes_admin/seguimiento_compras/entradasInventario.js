const express = require('express');
const rute = express();
const InventarioEntrada = require('../../../models/inventario_insumos_entrantes');
const InventarioEntradaCosto = require('../../../models/inventario_insumos_entrantes_costo');

//GET traemos informacion del inventario
rute.get('/:fecha/:pizzarraid', (req, res) => {

    let fechaInventario = req.params.fecha;
    let inv_id = req.params.pizzarraid;
    let result = [];

    result = LeerEntradasLeerCostos(fechaInventario, inv_id);

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

async function LeerEntradasLeerCostos(fechaInventario, inv_id){    
    
    let result = [];

    result = await InventarioEntrada.find({
        $and:[{"FECHA_INVENTARIO_ENTRANTE": fechaInventario}, {"INVENTARIO_AUX.INVENTARIO_ID": inv_id}] 
    });   

    //console.log(result)

    let result_aux = [];

    for(let i=0;i<Object.keys(result[0]._doc.INVENTARIO_AUX[0]).length;i++){
        if(Object.keys(result[0]._doc.INVENTARIO_AUX[0])[i] === "__v" || Object.keys(result[0]._doc.INVENTARIO_AUX[0])[i] === "INVENTARIO_AUX" || Object.keys(result[0]._doc.INVENTARIO_AUX[0])[i] === "_id" || Object.keys(result[0]._doc.INVENTARIO_AUX[0])[i] === "FECHA_INVENTARIO_ENTRANTE" || Object.keys(result[0]._doc.INVENTARIO_AUX[0])[i] === "INVENTARIO_ID"){

        }else{
            if(Object.values(result[0]._doc.INVENTARIO_AUX[0])[i] === null){
                // Array.prototype.push.apply(result_aux, [{'Item': Object.keys(result[0]._doc)[i], 'Valor': 0 }])
            }else if(Object.values(result[0]._doc.INVENTARIO_AUX[0])[i] === 0){ 

            }else{
                Array.prototype.push.apply(result_aux, [{'Item': Object.keys(result[0]._doc.INVENTARIO_AUX[0])[i], 'Cantidad': Object.values(result[0]._doc.INVENTARIO_AUX[0])[i] }])
            }
        }        
    }

    //console.log(result_aux)

    let result_costos = [];

    result_costos = await InventarioEntradaCosto.find( {
                                                            $and:[{"FECHA_INVENTARIO_ENTRANTE_COSTO": fechaInventario}, {"INVENTARIO_AUX.INVENTARIO_ID": inv_id}] 
                                                        });

    let result_costos_aux = [];

    

    for(let i=0;i<Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0]).length;i++){
        if(Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0])[i] === "__v" || Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0])[i] === "INVENTARIO_AUX" || Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0])[i] === "_id" || Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0])[i] === "FECHA_INVENTARIO_ENTRANTE_COSTO" || Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0])[i] === "INVENTARIO_ID"){

        }else{
            if(Object.values(result_costos[0]._doc.INVENTARIO_AUX[0])[i] === null){
                // Array.prototype.push.apply(result_aux, [{'Item': Object.keys(result[0]._doc)[i], 'Valor': 0 }])
            }else{
                Array.prototype.push.apply(result_costos_aux, [{'Item': Object.keys(result_costos[0]._doc.INVENTARIO_AUX[0])[i], 'Valor': Object.values(result_costos[0]._doc.INVENTARIO_AUX[0])[i] }])
            }
        }        
    }

    //console.log(result_costos_aux)

    //console.log(result_aux)
    //console.log(result_costos_aux)

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