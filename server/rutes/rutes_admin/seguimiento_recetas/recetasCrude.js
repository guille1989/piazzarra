const Express = require('express');
const rute = Express();
const RecetasPizzarra = require('../../../models/costo_productos');

//Get
rute.get('/', async (req, res) => {
    const recetas = await RecetasPizzarra.find();
    res.json(recetas);
});

//post with two inputs parameters
rute.post('/', async (req, res) => {
    const { id, tipo_producto, tipo_insumo, value } = req.body;
    let recetasResul = [];
    // Convertir value a entero
    const valueInt = parseInt(value, 10);

    
    try {
        const queryActualizacionInsumo = `DATOS.$.${tipo_insumo}`;

        const recetasResul = await RecetasPizzarra.updateOne(
            { _id: id, "DATOS.tipo_producto": tipo_producto },
            { $set: { [queryActualizacionInsumo]: valueInt } }, // Usar valueInt en lugar de value
            { upsert: false }
        );

        res.status(200).json('Ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el insumo');
    }
});

module.exports = rute;