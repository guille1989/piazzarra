const express = require('express');
const rute = express();
const Insumos = require('../../../models/insumos');

//GET traemos informacion del inventario
rute.get('/', (req, res) => {
    let result = [];

    result = leerInsumos();

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

async function leerInsumos(){    
    
    let result = [];

    result = await Insumos.find().sort({TIPO: 1});
    result.map((item, index) => {
        //console.log(item.TIPO)
    })    

    return result

}

module.exports = rute;