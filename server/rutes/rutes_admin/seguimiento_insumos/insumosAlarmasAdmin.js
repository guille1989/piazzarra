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

    result = await Insumos.find();

    return result

}

rute.post('/', (req, res) => {

    let body = req.body;

    let result = insertNuevoInsumo(body);

    result
        .then(data => {
            res.json({
                inv: data
            })
        })
        .catch(error => {
            res.json({
                err: error
            })
        })
})

async function insertNuevoInsumo(body){

    let result = [];

    //console.log(body.TIPO)
    //console.log(body.INSUMO_LIMITE)

    result = await Insumos.updateOne(
        {
            TIPO: body.TIPO
        }, 
        {
            $set: {
                INSUMO_LIMITE: body.INSUMO_LIMITE,
                INSUMO_CUADRE: body.INSUMO_CUADRE
            }
            
        }, { upsert: true });

    return result.save()
}

module.exports = rute;