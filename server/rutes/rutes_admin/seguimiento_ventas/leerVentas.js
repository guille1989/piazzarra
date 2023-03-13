const Express = require('express');
const rute = Express();
const PedidoPizzarra = require('../../../models/pizzarra_ventas');

//GET
rute.get('/:fecha', (req, res) => {

    let fecha_aux = req.params.fecha
    let result = [];
    result = leerPedidos(fecha_aux);

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

async function leerPedidos(fecha_aux){    

    //console.log(fecha_aux)

    //let todayAux = new Date(new Date(fecha_aux).setHours(-5,0,0,0))

    let result = [];

    result = await PedidoPizzarra.find({"aux.fecha_pedido": fecha_aux});

    let result_sum_ventas = 0;

    result.map((item, index) => {
        item.aux.map((item2, index2) => {
            result_sum_ventas = result_sum_ventas + item2.costo_pedido
        })
    })

    return {result, result_sum_ventas}
}

module.exports = rute;