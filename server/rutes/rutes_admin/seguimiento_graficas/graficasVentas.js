const Express = require('express');
const rute = Express();
const PedidoPizzarra = require('../../../models/pizzarra_ventas');

//GET
rute.get('/:fechaUno/:fechaDos', (req, res) => {

    let fecha_uno_aux = req.params.fechaUno
    let fecha_dos_aux = req.params.fechaDos

    let result = [];
    result = leerVentasSemana(fecha_uno_aux, fecha_dos_aux);

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

async function leerVentasSemana(fecha_uno_aux, fecha_dos_aux){    

    let local01 = 'Popayan-Centro'
    let local02 = 'Cali-Refugio'

    let count_domicilios = 0;
    let count_mesa = 0;
    let count_recogen = 0;
    let result_sum_ventas_acum = 0;

    //

    let resut_ventas_totales01 = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                   { "aux.fecha_pedido": 
                       {
                       $gte: fecha_uno_aux,
                       $lte: fecha_dos_aux
                       } 
                   },
                   {
                       "aux.local": local01 
                   }]     
             }
        },
        {
            $unwind: '$aux'
        }, 
        {
            $group: 
          {
            "_id": local01,
            "suma_ventas_totales": 
            {
                $sum: "$aux.costo_pedido"
            }
          }
        }

    ])
    //console.log(resut_ventas_totales01)

    let resut_ventas_totales02 = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                   { "aux.fecha_pedido": 
                       {
                       $gte: fecha_uno_aux,
                       $lte: fecha_dos_aux
                       } 
                   },
                   {
                       "aux.local": local02
                   }]     
             }
        },
        {
            $unwind: '$aux'
        }, 
        {
            $group: 
          {
            "_id": local02,
            "suma_ventas_totales": 
            {
              $sum: "$aux.costo_pedido"
            }
          }
        }

    ])
    //console.log(resut_ventas_totales02)

    let result04 = await PedidoPizzarra.aggregate([
        {
         $match: 
          {
            $and:[
                { "aux.fecha_pedido": 
                    {
                    $gte: fecha_uno_aux,
                    $lte: fecha_dos_aux
                    } 
                },
                {
                    "aux.local": local01 
                }]     
          }
        },
        {
            $unwind: '$aux'
        }, 
        {
          $group: 
          {
            "_id": "$aux.fecha_pedido",
            "suma_ventas": 
            {
              $sum: "$aux.costo_pedido"
            }
          }
        },
        { $sort : { _id: 1 } }
    ])
    //console.log(result04)

    let result05 = await PedidoPizzarra.aggregate([
        {
         $match: 
          {
            $and:[
                { "aux.fecha_pedido": 
                    {
                    $gte: fecha_uno_aux,
                    $lte: fecha_dos_aux
                    } 
                },
                {
                    "aux.local": local02 
                }]     
          }
        },
        {
            $unwind: '$aux'
        }, 
        {
          $group: 
          {
            "_id": "$aux.fecha_pedido",
            "suma_ventas": 
            {
              $sum: "$aux.costo_pedido"
            }
          }
        },
        { $sort : { _id: 1 } }
    ])
    //console.log(result05)

    let result06_tipo_popayan = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                    { "aux.fecha_pedido": 
                        {
                        $gte: fecha_uno_aux,
                        $lte: fecha_dos_aux
                        } 
                    },
                    {
                        "aux.local": local01
                    },
                    {
                        "aux.tipo_pedido": "MESA"
                    }]     
             }
           },
           {
            $group: 
            {
              "_id": "numero_pedidos_mesa",
              "suma": 
              {
                $sum: 1
              }
            }
          },
    ])
    //console.log(result06_tipo_popayan)

    let result07_tipo_popayan = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                    { "aux.fecha_pedido": 
                        {
                        $gte: fecha_uno_aux,
                        $lte: fecha_dos_aux
                        } 
                    },
                    {
                        "aux.local": local01
                    },
                    {
                        "aux.tipo_pedido": "DOMICILIO"
                    }]     
             }
           },
           {
            $group: 
            {
              "_id": "numero_pedidos_domicilio",
              "suma": 
              {
                $sum: 1
              }
            }
          },
    ])
    //console.log(result07_tipo_popayan)

    let result08_tipo_popayan = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                    { "aux.fecha_pedido": 
                        {
                        $gte: fecha_uno_aux,
                        $lte: fecha_dos_aux
                        } 
                    },
                    {
                        "aux.local": local01
                    },
                    {
                        "aux.tipo_pedido": "RECOGEN"
                    }]     
             }
           },
           {
            $group: 
            {
              "_id": "numero_pedidos_recogen",
              "suma": 
              {
                $sum: 1
              }
            }
          },
    ])
    //console.log(result08_tipo_popayan.length === 0)

    let result06_tipo_cali = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                    { "aux.fecha_pedido": 
                        {
                        $gte: fecha_uno_aux,
                        $lte: fecha_dos_aux
                        } 
                    },
                    {
                        "aux.local": local02
                    },
                    {
                        "aux.tipo_pedido": "MESA"
                    }]     
             }
           },
           {
            $group: 
            {
              "_id": "numero_pedidos_mesa",
              "suma": 
              {
                $sum: 1
              }
            }
          },
    ])
    //console.log(result06_tipo_cali[0].suma)

    let result07_tipo_cali = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                    { "aux.fecha_pedido": 
                        {
                        $gte: fecha_uno_aux,
                        $lte: fecha_dos_aux
                        } 
                    },
                    {
                        "aux.local": local02
                    },
                    {
                        "aux.tipo_pedido": "DOMICILIO"
                    }]     
             }
           },
           {
            $group: 
            {
              "_id": "numero_pedidos_domicilio",
              "suma": 
              {
                $sum: 1
              }
            }
          },
    ])
    //console.log(result07_tipo_cali)

    let result08_tipo_cali = await PedidoPizzarra.aggregate([
        {
            $match: 
             {
               $and:[
                    { "aux.fecha_pedido": 
                        {
                        $gte: fecha_uno_aux,
                        $lte: fecha_dos_aux
                        } 
                    },
                    {
                        "aux.local": local02
                    },
                    {
                        "aux.tipo_pedido": "RECOGEN"
                    }]     
             }
           },
           {
            $group: 
            {
              "_id": "numero_pedidos_recogen",
              "suma": 
              {
                $sum: 1
              }
            }
          },
    ])
    //

    let tipo_pedido_popayan = []

    if(result06_tipo_popayan.length === 0){
        tipo_pedido_popayan.push({x: 'Mesa', y: 0, text: `Pedidos Mesa: 0`})
    }else{
        tipo_pedido_popayan.push({x: 'Mesa', y: result06_tipo_popayan[0].suma, text: `Pedidos Mesa: ${result06_tipo_popayan[0].suma}`})
    } 
    
    if(result07_tipo_popayan.length === 0){
        tipo_pedido_popayan.push({x: 'Domicilio', y: 0, text: `Pedidos Domicilio: 0`})
    }else{
        tipo_pedido_popayan.push({x: 'Domicilio', y: result07_tipo_popayan[0].suma, text: `Pedidos Domicilio: ${result07_tipo_popayan[0].suma}`})
    } 
    
    if(result08_tipo_popayan.length === 0){
        tipo_pedido_popayan.push({x: 'Recogen', y: 0, text: `Pedidos Recogen: 0`})
    }else{
        tipo_pedido_popayan.push({x: 'Recogen', y: result08_tipo_popayan[0].suma, text: `Pedidos Recogen: ${result08_tipo_popayan[0].suma}`})
    }

    let tipo_pedido_cali = []

    if(result06_tipo_cali.length === 0){
        tipo_pedido_cali.push({x: 'Mesa', y: 0, text: `Pedidos Mesa: 0`} )
    }else{
        tipo_pedido_cali.push({x: 'Mesa', y: result06_tipo_cali[0].suma, text: `Pedidos Mesa: ${result06_tipo_cali[0].suma}`} )
    }

    if(result07_tipo_cali.length === 0){
        tipo_pedido_cali.push({x: 'Domicilio', y: 0, text: `Pedidos Domicilio: 0`} )
    }else{
        tipo_pedido_cali.push( {x: 'Domicilio', y: result07_tipo_cali[0].suma, text: `Pedidos Domicilio: ${result07_tipo_cali[0].suma}`} )
    }

    if(result08_tipo_cali.length === 0){
        tipo_pedido_cali.push({x: 'Recogen', y: 0, text: `Pedidos Recogen: 0`} )
    }else{
        tipo_pedido_cali.push( {x: 'Recogen', y: result08_tipo_cali[0].suma, text: `Pedidos Recogen: ${result08_tipo_cali[0].suma}`} )
    }
    

    if(resut_ventas_totales01.length === 0){
        resut_ventas_totales01 = [ { _id: 'Popayan-Centro', suma_ventas_totales: 0 } ]
    }

    if(resut_ventas_totales02.length === 0){
        resut_ventas_totales02 = [ { _id: 'Cali-Refugio', suma_ventas_totales: 0 } ]
    }

    return {result04, result05, resut_ventas_totales01, resut_ventas_totales02, 
        tipo_pedido_popayan, 
        tipo_pedido_cali}
}

module.exports = rute;