const express = require('express');
const route = express();
const CostoProductosPizzarra = require('../../../models/costo_productos_pizzarra');


route.put('/', (req, res) => {

    let body= req.body;

    let ResultLeerCostosP = ActualizarValorProducto(body)

    ResultLeerCostosP
        .then(data => {
            res.json({
                info: data
            })
        })
        .catch(err => {
            res.json({
                erro: 'Error desde Backend: ' + err
            })
        })
})

async function ActualizarValorProducto(body){

    let result = []

    result = await CostoProductosPizzarra.updateOne({'TIPO': body.TIPO}, {$set: {'COSTO': body.COSTO}})

    return result
}

module.exports= route;