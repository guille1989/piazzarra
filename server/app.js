const express = require('express');
const app = express();
const mongose = require('mongoose');
const corse = require('cors');
const bodyParser = require("body-parser");

//Importamos rutas
const Autenticacion = require('./rutes/autenticacion/autenticacion');
const InventarioActual = require('./rutes/inventario_actual/inventarioActual');
const Insumos = require('./rutes/insumos/insumos');
const IngresarEntradaInventario = require('./rutes/inventario_entrante/ingresoInventario');
const IngresarEntradaInventarioCosto = require('./rutes/inventario_entrante_costos/ingresoInventarioCostos');
const ValidacionInventarioExistente = require('./rutes/validaciones/revisionInventarioExiste');
const LeerInventarios = require('./rutes/resumen/leerinventarios');


//Middlewares*****
app.use(express.json());
app.use(corse());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
//*****************

//Conexion con DB MONGOATLAS

//Conectamos con Data Base
mongose.connect('mongodb+srv://root:123@cluster0.jwxt0.mongodb.net/inventarios_prod?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado con DB'))
    .catch(() => console.log('No se puedo conectar con DB'))

mongose.set('strictQuery', true);
//*************************

//Manejador de rutas
app.use('/api/inicio', Autenticacion)
app.use('/api/inventarioactual', InventarioActual);                 //Inventario Final
app.use('/api/insumos', Insumos);                                   //Insumos que se manejan en el negocio
app.use('/api/entradasinventario', IngresarEntradaInventario);      //Inventario de entrada de insumos
app.use('/api/insumocostos', IngresarEntradaInventarioCosto);       //Costo de los insumos de entradas
app.use('/api/revisioninventariofecha', ValidacionInventarioExistente);  //Revision si existe inventario ya registrado
app.use('/api/leerinventarios', LeerInventarios);                   //Leemos todos los inventarios de la DB.


//Iniciamos Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`BackEnd escuchando por puerto ${port}....`)
})