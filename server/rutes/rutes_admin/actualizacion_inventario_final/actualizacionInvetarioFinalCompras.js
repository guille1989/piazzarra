const express = require('express');
const rute = express();
const InventarioActual = require('../../../models/inventarios_insumos_actuales');
const InventarioCompras = require('../../../models/inventario_insumos_entrantes');

rute.put('/', (req, res) => {

    let body = req.body;

    let resultActualizacion = ActualizarInventario(body);

    resultActualizacion
        .then(info => {
            res.json({
                inv: info
            })
        })
        .catch(err => {
            res.json({
                error: 'Error desde BackEnd: ' + err
            })
        })

})

async function ActualizarInventario(body){

    let result = [];

    let resultCompras = [];

    //console.log(['INVENTARIO_AUX.' + body.TIPO])

    
    result = await InventarioActual.updateOne({'FECHA_INVENTARIO_ACTUAL': body.fecha, 'INVENTARIO_AUX.INVENTARIO_ID': body.id}, {
        $set: {
            ['INVENTARIO_AUX.0.' + body.TIPO] : body.invFinal    
        }
    }, {upsert: false})

    
    resultCompras = await InventarioCompras.updateOne({'FECHA_INVENTARIO_ENTRANTE': body.fecha, 'INVENTARIO_AUX.INVENTARIO_ID': body.id}, {
        $set: {
            ['INVENTARIO_AUX.0.' + body.TIPO] : body.invCompras 
        }
    }, {upsert: false})
    
    return {result, resultCompras}
}

module.exports = rute;