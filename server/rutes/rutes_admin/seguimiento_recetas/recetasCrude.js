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
    const { nuevoRegistro } = req.body;
    try {
        const nuevoReceta = new RecetasPizzarra(nuevoRegistro);
        await nuevoReceta.save();
        res.status(201).json('Nuevo registro creado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el nuevo registro');
    }
        
});

rute.put('/', async (req, res) => {
    let { id, datos_actualizar, tipo_producto, tipo_actualizacion } = req.body;

    if (tipo_actualizacion === 'agregarNuevoInsumo') {
        try {
            const receta = await RecetasPizzarra.findOne(
                { _id: id, 'DATOS.tipo_producto': tipo_producto }
            );  
    
            if (!receta) {
                return res.status(404).send('Receta no encontrada');
            }
    
            const datosProducto = receta.DATOS.find(dato => dato.tipo_producto === tipo_producto);
            const containsSearchString = datos_actualizar.some(str => Object.keys(datosProducto).includes(str));
    
            if (containsSearchString) {
                datos_actualizar = datos_actualizar.filter(str => !Object.keys(datosProducto).includes(str));
            }
    
            if (datos_actualizar.length === 0) {
                return res.status(400).send('Ninguno de los strings está presente en el tipo de producto');
            }
    
            const updateFields = {};
            for (const key in datos_actualizar) {
                if (key !== 'tipo_producto') {
                    updateFields[`DATOS.$.${datos_actualizar[key]}`] = 0;
                }
            }
    
            const result = await RecetasPizzarra.updateOne(
                { _id: id, 'DATOS.tipo_producto': tipo_producto },
                { $set: updateFields }
            );

            if (result.modifiedCount > 0) {
                const recetas = await RecetasPizzarra.find();
                res.status(200).json(recetas);
            } else {
                res.status(500).send('Error al actualizar el insumo');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar el insumo');
        }
    } else if (tipo_actualizacion === 'actualizarReceta') {
        //console.log('actualizarReceta');
        //console.log(id, datos_actualizar, tipo_producto, tipo_actualizacion);
        try {
            const updateFields = {};
            for (const key in datos_actualizar) {
                if (key !== 'tipo_producto') {
                    updateFields[`DATOS.$.${key}`] = datos_actualizar[key];
                }
            }

            const result = await RecetasPizzarra.updateOne(
                { _id: id, 'DATOS.tipo_producto': tipo_producto },
                { $set: updateFields }
            );
            res.status(200).json("Ok");
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar el insumo');
        }
    }
});


module.exports = rute;