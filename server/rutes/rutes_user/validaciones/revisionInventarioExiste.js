const express = require('express');
const rute = express();
const InventarioActual = require('../../../models/inventarios_insumos_actuales');

//GET traemos informacion del inventario
rute.get('/:fecha/:pizzeriaid', (req, res) => {

    let fechaInventario = req.params.fecha;
    let inv_id = req.params.pizzeriaid;
    let result = [];

    result = leerInventario(fechaInventario, inv_id);

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

async function leerInventario(fechaInventario, inv_id){    
    
    let result = [];

    result = await InventarioActual.find(
        {
            $and:[{"FECHA_INVENTARIO_ACTUAL": fechaInventario}, {"INVENTARIO_AUX.INVENTARIO_ID": inv_id}] 
        });

    return result

}

module.exports = rute;