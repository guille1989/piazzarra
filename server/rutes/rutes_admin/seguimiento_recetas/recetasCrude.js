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
    const { id, datos_actualizar } = req.body;
    
    try {
        const updateFields = {};
        for (const key in datos_actualizar) {
            if (key !== 'tipo_producto') {
                updateFields[`DATOS.$.${key}`] = datos_actualizar[key];
            }
        }

        // Ejecutar la consulta de actualización
        const recetasResul = await RecetasPizzarra.updateOne(
            { _id: id, "DATOS.tipo_producto": datos_actualizar.tipo_producto },
            { $set: updateFields },
            { upsert: false }
        );

        res.status(200).json('Ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el insumo');
    }
        
});

module.exports = rute;