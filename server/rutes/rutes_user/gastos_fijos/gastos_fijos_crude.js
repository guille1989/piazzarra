const express = require('express');
const rute = express();
const GastosFijos = require('../../../models/gastos_fijos');
const GastosFijosPizzarras = require('../../../models/gastos_fijos_pizzarras');

//GET traemos informacion del inventario
rute.get('/', (req, res) => {
    let result = [];

    result = leerCategoriaGastosFijos();

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

//POST para agregar un nuevo gasto fijo
rute.post('/:local/:mes/:anno', (req, res) => {
    let result = [];
    let local = req.params.local;
    let fecha_gasto = req.params.mes + '-' + req.params.anno;
    result = agregarCategoriaGastosFijos(req.body, local, fecha_gasto);

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

async function leerCategoriaGastosFijos(){    
    
    console.log('Leyendo categorias de gastos fijos')
    let result = [];

    result = await GastosFijos.find(); 

    return result

}

async function agregarCategoriaGastosFijos(body, local, fecha_gasto){
    console.log('fecha_gasto', fecha_gasto)
    console.log('local', local)
    console.log('Agregando categoria de gastos fijos', body)
    let result = new GastosFijosPizzarras({
        LOCAL: local,
        FECHA_GASTO_fIJO: fecha_gasto,
        GASTOS: body
    });

    result = await result.save();
    console.log('Categoria de gastos fijos agregada', result)
    return result
}

module.exports = rute;