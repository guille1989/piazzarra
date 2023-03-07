const express = require('express');
const rute = express();
const InventarioActual = require('../../../models/inventarios_insumos_actuales');

//GET traemos informacion del inventario
rute.get('/:fecha', (req, res) => {

    let fechaInventario = req.params.fecha;
    let result = [];

    result = leerInventario(fechaInventario);

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

async function leerInventario(fechaInventario){    
    
    let result = [];

    result = await InventarioActual.find({FECHA_INVENTARIO_ACTUAL: fechaInventario});

    return result

}

module.exports = rute;