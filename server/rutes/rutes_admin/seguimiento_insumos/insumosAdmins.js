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

    let nuevo_insumo = body.NuevoInsumo.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(' ', '_')
    let nuevo_insumo_tipo = body.NuevoInsumoTipo;
    let nuevo_insumo_tipo_medida = body.NuevoInsumoTipoMedida;

    let result = [];

    result = await Insumos({
        TIPO: nuevo_insumo,
        INSUMO_TIPO: nuevo_insumo_tipo,
        INSUMO_MEDIDA: nuevo_insumo_tipo_medida
    })

    return result.save()
}

rute.delete('/:idInsumo', (req, res) => {

    let idInsumo = req.params.idInsumo;

    let result = EliminarInsumo(idInsumo);

    result
        .then(data => {
            res.json({
                msj: data
            })
        })
        .catch(error => {
            res.json({
                err: error
            })
        })
})

async function EliminarInsumo(idInsumo){

    let result = await Insumos.deleteOne({_id: idInsumo});

    return result
}

module.exports = rute;