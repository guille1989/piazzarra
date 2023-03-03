const express = require('express');
const rute = express();
const InventarioActual = require('../../models/inventarios_insumos_actuales');
const InventarioEntrada = require('../../models/inventario_insumos_entrantes');
const InventarioEntradaCostos = require('../../models/inventario_insumos_entrantes_costo');

//GET traemos informacion del inventario
rute.get('/:fecha', (req, res) => {

    let fechaInventario = req.params.fecha;
    let result_inventario = [];

    result_inventario = LeerInventarios(fechaInventario);


    result_inventario
        .then(data => {
            res.json({
                inv: data
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
})

async function LeerInventarios(fechaInventario){    
    
    let result_inventario = [];
    let result_inventario_entrada = [];
    let result_inventario_entrada_costo = [];

    result_inventario = await InventarioActual.find({FECHA_INVENTARIO_ACTUAL: fechaInventario});
    result_inventario_entrada = await InventarioEntrada.find({FECHA_INVENTARIO_ENTRANTE: fechaInventario});
    result_inventario_entrada_costo = await InventarioEntradaCostos.find();

    let resulta_aux = [];

    //console.log(Object.keys(result_inventario[0]._doc))
    //console.log(Object.keys(result_inventario_entrada[0]._doc))

    //console.log(Object.values(result_inventario[0]._doc))

    Object.keys(result_inventario[0]._doc).forEach((element, index) => {
        //console.log({"item_": element})
        //console.log(index)
        if(element === "__v" || element === "INVENTARIO_AUX" || element === "_id" || element === "FECHA_INVENTARIO_ACTUAL"){

        }else{
            if(Object.values(result_inventario[0]._doc)[index] === null){
                if(Object.values(result_inventario_entrada[0]._doc)[index] === null){
                    Array.prototype.push.apply(resulta_aux, [{"item_tipo": element, "item_cantidad": 0, "item_cantidad_entrada": 0 }])
                }else{
                    Array.prototype.push.apply(resulta_aux, [{"item_tipo": element, "item_cantidad": 0, "item_cantidad_entrada": Object.values(result_inventario_entrada[0]._doc)[index] }])
                }               
            }else{
                if(Object.values(result_inventario_entrada[0]._doc)[index] === null){
                    Array.prototype.push.apply(resulta_aux, [{"item_tipo": element, "item_cantidad": Object.values(result_inventario[0]._doc)[index], "item_cantidad_entrada": 0 }])
                }else{
                    Array.prototype.push.apply(resulta_aux, [{"item_tipo": element, "item_cantidad": Object.values(result_inventario[0]._doc)[index], "item_cantidad_entrada": Object.values(result_inventario_entrada[0]._doc)[index] }])
                }                
            }            
        }
        
    });

    //console.log(resulta_aux)

    return {result_inventario, result_inventario_entrada, result_inventario_entrada_costo, resulta_aux}

}

module.exports = rute;