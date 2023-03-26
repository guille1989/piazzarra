const Express = require('express');
const rute = Express();
const PedidoPizzarra = require('../../../models/pizzarra_ventas');

//GET
rute.get('/:fechaUno/:filtro/:pedidos_aux', (req, res) => {

    let fecha_uno_aux = req.params.fechaUno
    let filtro_tipo = req.params.filtro
    let pedidos_aux = req.params.pedidos_aux

    let result = [];
    result = leerVentasSemana(fecha_uno_aux, filtro_tipo, pedidos_aux);

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

async function leerVentasSemana(fecha_uno_aux, filtro_tipo, pedidos_aux){    

    //console.log(filtro_tipo)

    let dateAux = new Date(fecha_uno_aux)
    let date_semana = ''
    let date_semana_search = [fecha_uno_aux];
    let result = [];
    let result_aux = [];
    let result_limite = [];
    let result_sum_ventas_acum = 0;

    if(filtro_tipo === 'semana'){       
        for(let i=1; i<7; i++){
            dateAux.setDate(dateAux.getDate() + 1);
            day = dateAux.getDate() + 1;
            month = dateAux.getMonth() + 1;
            year = dateAux.getFullYear();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            date_semana = year + "-" + month + "-" + day;
            date_semana_search.push(date_semana)
        }

        for(let i =0; i<date_semana_search.length; i++){
            result = await PedidoPizzarra.find({
                $and:[{"aux.fecha_pedido": date_semana_search[i]}, {"aux.local": pedidos_aux}] 
            });           

            result.map((item, index) => {
                item.aux.map((item2, index2) => {
                    result_sum_ventas_acum = result_sum_ventas_acum + item2.costo_pedido
                })
            })

            result_aux.push({"Fecha": date_semana_search[i].split('-')[1] + '-' + date_semana_search[i].split('-')[2], "Dato": result, "Limite": 1000000})
            result_limite.push({"Fecha": date_semana_search[i].split('-')[1] + '-' + date_semana_search[i].split('-')[2], "Dato": 1000000})
        }

        let result_sum_ventas = 0;

        result_aux.map((item, index) => {
            result_sum_ventas = 0;
            item.Dato.map((item2, index2) => {
                item2.aux.map((item3, index3) => {
                    result_sum_ventas = result_sum_ventas + item3.costo_pedido
                })
            })
            result_aux[index].Dato = result_sum_ventas
        })

        result_sum_ventas_acum = result_sum_ventas_acum / 7

    }else if(filtro_tipo === 'mes'){
        for(let i=1; i<30; i++){
            dateAux.setDate(dateAux.getDate() + 1);
            day = dateAux.getDate() + 1;
            month = dateAux.getMonth() + 1;
            year = dateAux.getFullYear();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            date_semana = year + "-" + month + "-" + day;
            date_semana_search.push(date_semana)
        }
        
        for(let i =0; i<date_semana_search.length; i++){
            result = await PedidoPizzarra.find({
                $and:[{"aux.fecha_pedido": date_semana_search[i]}, {"aux.local": pedidos_aux}] 
            });

            result.map((item, index) => {
                item.aux.map((item2, index2) => {
                    result_sum_ventas_acum = result_sum_ventas_acum + item2.costo_pedido
                })
            })

            result_aux.push({"Fecha": date_semana_search[i].split('-')[1] + '-' + date_semana_search[i].split('-')[2], "Dato": result, "Limite": 1000000})
            result_limite.push({"Fecha": date_semana_search[i].split('-')[1] + '-' + date_semana_search[i].split('-')[2], "Dato": 1000000})
        }

        let result_sum_ventas = 0;

        result_aux.map((item, index) => {
            result_sum_ventas = 0;
            item.Dato.map((item2, index2) => {
                item2.aux.map((item3, index3) => {
                    result_sum_ventas = result_sum_ventas + item3.costo_pedido
                })
            })
            result_aux[index].Dato = result_sum_ventas
        })

        result_sum_ventas_acum = result_sum_ventas_acum / 30
    }

    return {result_aux, result_limite, result_sum_ventas_acum}
}

module.exports = rute;