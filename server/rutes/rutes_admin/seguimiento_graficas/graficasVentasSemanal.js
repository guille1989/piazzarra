const Express = require('express');
const rute = Express();
const PedidoPizzarra = require('../../../models/pizzarra_ventas');

//GET
rute.get('/:fechaUno/:filtro', (req, res) => {

    let fecha_uno_aux = req.params.fechaUno
    let filtro_tipo = req.params.filtro

    let result = [];
    result = leerVentasSemana(fecha_uno_aux, filtro_tipo);

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

async function leerVentasSemana(fecha_uno_aux, filtro_tipo){    

    console.log(filtro_tipo)

    let dateAux = new Date(fecha_uno_aux)
    let date_semana = ''
    let date_semana_search = [fecha_uno_aux];
    let result = [];
    let result_aux = [];
    let result_limite = [];

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
            result = await PedidoPizzarra.find({"aux.fecha_pedido": date_semana_search[i]});

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
            result = await PedidoPizzarra.find({"aux.fecha_pedido": date_semana_search[i]});

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
    }

    return {result_aux, result_limite}
}

module.exports = rute;