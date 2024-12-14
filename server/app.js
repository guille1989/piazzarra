const express = require('express');
const app = express();
const mongose = require('mongoose');
const corse = require('cors');
const bodyParser = require("body-parser");

//Importamos rutas
const Autenticacion = require('./rutes/rutes_user/autenticacion/autenticacion');
const InventarioActual = require('./rutes/rutes_user/inventario_actual/inventarioActual');
const Insumos = require('./rutes/rutes_user/insumos/insumos');
const IngresarEntradaInventario = require('./rutes/rutes_user/inventario_entrante/ingresoInventario');
const IngresarEntradaInventarioCosto = require('./rutes/rutes_user/inventario_entrante_costos/ingresoInventarioCostos');
const ValidacionInventarioExistente = require('./rutes/rutes_user/validaciones/revisionInventarioExiste');
const LeerInventarios = require('./rutes/rutes_user/resumen/leerinventarios');

//Rutas Administrdaod
const InventarioActualAdmin = require('./rutes/rutes_admin/seguimiento_inentarios/inventario_final/inventarioFinal');
const InventarioEntradaAdmin = require('./rutes/rutes_admin/seguimiento_compras/entradasInventario');
const InsumosAdmin = require('./rutes/rutes_admin/seguimiento_insumos/insumosAdmins');
const LeerPedidos = require('./rutes/rutes_admin/seguimiento_ventas/leerVentas');
const LeerPedidosSalidas = require('./rutes/rutes_admin/seguimiento_ventas/leerVentasSalidas');
const LeerComprasAdmin = require('./rutes/rutes_admin/seguimiento_compras/entradasInventario');
const LeerVentasSemanaAdmin = require('./rutes/rutes_admin/seguimiento_graficas/graficasVentasSemanal');
const LeerProduccionSemanaAdmin = require('./rutes/rutes_admin/seguimiento_graficas/graficasProduccionSemana');
const ActualizarLimitesInsumos = require('./rutes/rutes_admin/seguimiento_insumos/insumosAlarmasAdmin');
const CuadreGeneralInventarioAdmin = require('./rutes/rutes_admin/seguimiento_cuadre_inventario/cuadreInventario');
const GraficaVentas = require('./rutes/rutes_admin/seguimiento_graficas/graficasVentas');
const SeguimientoCostoInsumo = require('./rutes/rutes_admin/seguimiento_insumos/insumosSeguimientoCostos');
const LeerCostoProductos = require('./rutes/rutes_admin/seguimiento_costos_productos/costos_productos_crude');
const ActualizarCostoProducto = require('./rutes/rutes_admin/seguimiento_costos_productos/costo_productos_pizzarra_crude');
const ActualizarInventariosAdmin = require('./rutes/rutes_admin/actualizacion_inventario_final/actualizacionInvetarioFinalCompras');
const RecetasPizzarra = require('./rutes/rutes_admin/seguimiento_recetas/recetasCrude');

//
const SeguimientoControlInsumos = require('./rutes/rutes_admin/seguimiento_control_admin_insumos/seguimientoInsumos');

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
app.use('/api/insumos', Insumos);     
app.use('/api/entradasinventario', IngresarEntradaInventario);      //Inventario de entrada de insumos
app.use('/api/insumocostos', IngresarEntradaInventarioCosto);       //Costo de los insumos de entradas
app.use('/api/revisioninventariofecha', ValidacionInventarioExistente);  //Revision si existe inventario ya registrado
app.use('/api/leerinventarios', LeerInventarios);                   //Leemos todos los inventarios de la DB.

//Rutas Admin
app.use('/api/admin/inventarioactual', InventarioActualAdmin);      //Leemos inventario final
app.use('/api/admin/inventarioentradas', InventarioEntradaAdmin);   //Leemos entradas de inventario
app.use('/api/admin/insumos', InsumosAdmin);                        //Leemos insumos / escribimos nuevo insmo
app.use('/api/admin/pedidos', LeerPedidos);                         //Leemos pedidos
app.use('/api/admin/pedidossalidas', LeerPedidosSalidas)            //Leemos ventas dia
app.use('/api/admin/compras', LeerComprasAdmin);                    //Leemos las compras del dia
app.use('/api/admin/ventassemana', LeerVentasSemanaAdmin);          //Leemos las ventas por semana
app.use('/api/admin/actualizacionlimites', ActualizarLimitesInsumos)//Actualizamos limites de insumos para las alarmas
app.use('/api/admin/cuadre', CuadreGeneralInventarioAdmin)          //Cuadre de inventario en backend
app.use('/api/admin/graficaproduccion', LeerProduccionSemanaAdmin)  //Leemos grafica produccion
app.use('/api/admin/graficasventas', GraficaVentas)
app.use('/api/admin/seguimienticostos', SeguimientoCostoInsumo)
app.use('/api/admin/costoproductos', LeerCostoProductos)
app.use('/api/admin/actualizarcostoproductos', ActualizarCostoProducto)
app.use('/api/admin/actualizarinventarios', ActualizarInventariosAdmin)
app.use('/api/admin/seguimientocontrolinsumos', SeguimientoControlInsumos)
app.use('/api/admin/seguimientorecetas', RecetasPizzarra)

//Iniciamos Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`BackEnd escuchando por puerto ${port}....`)
})