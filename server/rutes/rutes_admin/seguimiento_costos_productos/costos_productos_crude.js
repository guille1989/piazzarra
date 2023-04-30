const express = require('express');
const route = express();
const CostosProductos = require('../../../models/costo_productos');
const DataInsumosCosto = require('../../../models/insumos');


route.get('/', (req, res) => {
    let ResultLeerCostosP = LeerCostosP()

    ResultLeerCostosP
        .then(data => {
            res.json({
                info: data
            })
        })
        .catch(err => {
            res.json({
                erro: 'Error desde Backend: ' + err
            })
        })
})

async function LeerCostosP(){

    let resultInsumoCostos =  await DataInsumosCosto.find({});

    let result = await CostosProductos.find();

    let costoPizzaPersonalAux = [];

    let costoPizzaGrandeAux = [];

    let costoPizzaPantalonAux = [];

    let costoPizzaPacookAux = [];

    let costoPizzaLasagnaNapolitanaAux = [];

    let costoPizzaLasagnaQuesoAux = [];

    let costoPizzaSpaguettiNapolitanaAux = [];

    let costoPizzaFetucciniNapolitanaAux = [];

    let costoPizzaSpaguettiQuesoAux = [];

    let costoPizzaFetucciniQuesoAux = [];

    let costoDesayunoCafe = [];

    let costoDesayunoChocolate = [];

    let costoDesayunoAromatica = [];

    let costoDesayunoTe = [];

   
    result.map((item, index) => {
        //console.log(item)
        item.DATOS.map((item2, index2) => {
            //console.log(item2)
            if(item2.tipo_producto === 'PIZZA_PERSONAL_COMPLETA'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaPersonalAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 19000, '% DE INSUMOS': ((costoProductoAux * 100) / 19000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_GRANDE_COMPLETA'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaGrandeAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 51000 , '% DE INSUMOS': ((costoProductoAux * 100) / 51000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_PANTALON'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaPantalonAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 20000, '% DE INSUMOS': ((costoProductoAux * 100) / 20000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_PANCOOK'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaPacookAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 19000, '% DE INSUMOS': ((costoProductoAux * 100) / 19000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_LASAGNA_NAPOLITANA'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaLasagnaNapolitanaAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 24000, '% DE INSUMOS': ((costoProductoAux * 100) / 24000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_LASAGNA_QUESO'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaLasagnaQuesoAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 26000, '% DE INSUMOS': ((costoProductoAux * 100) / 26000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_PASTA_SPAGUETTI_NAPOLITANA'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaSpaguettiNapolitanaAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 25000, '% DE INSUMOS': ((costoProductoAux * 100) / 25000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_PASTA_FETUCCINI_NAPOLITANA'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaFetucciniNapolitanaAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 27000, '% DE INSUMOS': ((costoProductoAux * 100) / 27000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_PASTA_SPAGUETTI_QUESO'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaSpaguettiQuesoAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 25000, '% DE INSUMOS': ((costoProductoAux * 100) / 25000).toFixed(2)})
            }else if(item2.tipo_producto === 'PIZZA_PASTA_FETUCCINI_QUESO'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoPizzaFetucciniQuesoAux.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 27000, '% DE INSUMOS': ((costoProductoAux * 100) / 27000).toFixed(2)})
            }else if(item2.tipo_producto === 'DESAYUNO_CAFE'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoProductoAux = costoProductoAux + 1225 //Ajuste costo fruta y jugo
                costoDesayunoCafe.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 18000, '% DE INSUMOS': ((costoProductoAux * 100) / 18000).toFixed(2)})
            }else if(item2.tipo_producto === 'DESAYUNO_CHOCOLATE'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoProductoAux = costoProductoAux + 1225 //Ajuste costo fruta y jugo
                costoDesayunoChocolate.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 18000, '% DE INSUMOS': ((costoProductoAux * 100) / 18000).toFixed(2)})
            }else if(item2.tipo_producto === 'DESAYUNO_AGUA_AROMATICA'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoProductoAux = costoProductoAux + 1225 //Ajuste costo fruta y jugo
                costoDesayunoAromatica.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 18000, '% DE INSUMOS': ((costoProductoAux * 100) / 18000).toFixed(2)})
            }
            else if(item2.tipo_producto === 'DESAYUNO_TE'){
                let costoProductoAux = 0 
                for (var ingrediente in item2){
                    //console.log('Tipo Insumo: ' + ingrediente)
                    //console.log('Cantidad Insumo: ' + item2[ingrediente])
    
                    let ingredienteCosto = resultInsumoCostos.find((element, index) => {
                        return element.TIPO === ingrediente;
                      });
                      
                      if(ingredienteCosto === undefined){
    
                      }else{
                        //console.log('Costo Insumo: ' + ingredienteCosto.INSUMO_COSTO);
                        //console.log('Costo Insumo en Producto: ' + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente])));
                        costoProductoAux = costoProductoAux + (parseFloat(ingredienteCosto.INSUMO_COSTO) * parseFloat(item2[ingrediente]))
                        //console.log('--------------------------')  
                    }
                }
                costoProductoAux = costoProductoAux + 1225 //Ajuste costo fruta y jugo
                costoDesayunoTe.push({'SABOR_PRODUCTO': item.TIPO_SABOR, 'TIPO_PRODUCTO': item2.tipo_producto, 'COSTO_PRODUCTO': costoProductoAux, 'COSTO_PRODUCTO_VENTA': 18000, '% DE INSUMOS': ((costoProductoAux * 100) / 18000).toFixed(2)})
            }
            
            //console.log('Costo Total del Producto: ' + costoProductoAux)
        })
    })  
    
    console.log(costoPizzaPantalonAux)

    return {costoPizzaPersonalAux, 
            costoPizzaGrandeAux, 
            costoPizzaPantalonAux, 
            costoPizzaPacookAux, 
            costoPizzaLasagnaNapolitanaAux, 
            costoPizzaLasagnaQuesoAux,
            costoPizzaSpaguettiNapolitanaAux,
            costoPizzaFetucciniNapolitanaAux,
            costoPizzaSpaguettiQuesoAux,
            costoPizzaFetucciniQuesoAux,
            costoDesayunoCafe,
            costoDesayunoChocolate,
            costoDesayunoAromatica,
            costoDesayunoTe}

}

module.exports = route

