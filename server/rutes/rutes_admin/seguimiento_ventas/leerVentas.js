const Express = require('express');
const rute = Express();
const PedidoPizzarra = require('../../../models/pizzarra_ventas');

//GET
rute.get('/:fecha/:pizzarraid', (req, res) => {

    let fecha_aux = req.params.fecha
    let pedidos_aux = req.params.pizzarraid
    let result = [];
    result = leerPedidos(fecha_aux, pedidos_aux);

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

async function leerPedidos(fecha_aux, pedidos_aux){    

    //console.log(fecha_aux)

    //let todayAux = new Date(new Date(fecha_aux).setHours(-5,0,0,0))

    let result = [];

    let result_sum_tipo = [];

    let pizza_personal = 0
    let pizza_grande = 0
    let pizza_pantalon = 0
    let pizza_pancook = 0

    let pizza_lasagna = 0
    let pizza_pasta_spagetti = 0
    let pizza_pasta_fetuchini = 0

    let cerveza_poker = 0
    let cerveza_club = 0
    let cerveza_aguila = 0

    let glitrocuarto = 0
    let gcocacolazero = 0
    let gcocacolanormal = 0

    let limonada = 0
    let jarra_limonada = 0
    let jugo_mora = 0
    let jugo_mango = 0
    let jugo_lulo = 0
    let jugo_lulada = 0

    let vino_botella_tinto = 0
    let vino_copa_tinto = 0

    let cafe_bebida = 0

    let sopa_pollo = 0
    let sopa_tomate = 0
    let sopa_cebolla = 0

    let pan_ajo = 0
    let pan_10_unidades = 0
    let pan_20_unidades = 0
    let pancook_2_unidades = 0
    let pancook_unidad = 0
    let pan_unidad = 0
    let masa_personal_cinco = 0
    let masa_mediana_unidad = 0

    let salsa_16_onzas = 0

    let agua_con_gas = 0
    let agua_sin_gas = 0


    result = await PedidoPizzarra.find({
        $and:[{"aux.fecha_pedido": fecha_aux}, {"aux.local": pedidos_aux}] 
    });

    let result_sum_ventas = 0;

    result.map((item, index) => {
        item.aux.map((item2, index2) => {
            result_sum_ventas = result_sum_ventas + item2.costo_pedido
        })
    })

    //Suma por tipo

    result.map((item, index) => {
        item.pedido.map((item2, index2) => {
            //console.log(item2)
            if( item2.tipo.includes('PIZZA PERSONAL') ){
                pizza_personal = pizza_personal + 1
            }else if( item2.tipo.includes('PIZZA GRANDE') ){
                pizza_grande = pizza_grande + 1
            }else if( item2.tipo.includes('PANTALON') ){
                pizza_pantalon = pizza_pantalon + 1
            }else if( item2.tipo.includes('PANCOOK') ){
                pizza_pancook = pizza_pancook + 1
            }else if( item2.tipo.includes('PASTA TIPO: FETUCCINI') ){
                pizza_pasta_fetuchini = pizza_pasta_fetuchini + 1
            }else if( item2.tipo.includes('PASTA TIPO: SPAGHETTI') ){
                pizza_pasta_spagetti = pizza_pasta_spagetti + 1
            }else if( item2.tipo.includes('LASAGNA SALSA') ){
                pizza_lasagna = pizza_lasagna + 1
            }else if(item2.tipo.includes("CLUB")){
                cerveza_club = cerveza_club + 1     
            }else if(item2.tipo.includes("POKER")){
                cerveza_poker = cerveza_poker + 1
            }else if(item2.tipo.includes("AGUILA")){
                cerveza_aguila = cerveza_aguila + 1        
            }else if(item2.tipo.includes("LITRO/4")){
                let glt4 = item2.tipo.split("X", 2)
                glitrocuarto = glitrocuarto + parseInt(glt4[1])
            }else if(item2.tipo.includes("COLA ZERO")){
                let g350 = item2.tipo.split("X", 2)
                gcocacolazero = gcocacolazero + parseInt(g350[1])
            }else if(item2.tipo.includes("COLA 350")){
                let g350 = item2.tipo.split("X", 2)
                gcocacolanormal = gcocacolanormal + parseInt(g350[1])
            }else if(item2.tipo.includes("JUGO")){
                if(item2.tipo.includes("LIMONADA")){
                    if(item2.tipo.includes("JARRA")){
                        jarra_limonada = jarra_limonada + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else{
                        limonada = limonada + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }else{
                    
                    if(item2.tipo.includes("MANGO")){
                        jugo_mango = jugo_mango + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else if(item2.tipo.includes("LULO")){
                       jugo_lulo = jugo_lulo + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else if(item2.tipo.includes("LULADA")){
                       jugo_lulada = jugo_lulada + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else if(item2.tipo.includes("MORA")){
                       jugo_mora = jugo_mora + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }  
            }else if(item2.tipo.includes("VINO")){

                if(item2.tipo.includes("BOTELLA")){
                    vino_botella_tinto = vino_botella_tinto + parseInt(item2.tipo.replace( /^\D+/g, '')) 
                }else{
                    vino_copa_tinto = vino_copa_tinto + parseInt(item2.tipo.replace( /^\D+/g, ''))
                }   
            }else if(item2.tipo.includes("CAFÉ")){
                cafe_bebida = cafe_bebida + parseInt(item2.tipo.replace( /^\D+/g, ''))
            }else if(item2.tipo.includes("SOPA")){
                if(item2.sabor_sopa === "POLLO"){
                    sopa_pollo = sopa_pollo + 1
                }else if(item2.sabor_sopa === "TOMATE"){
                    sopa_tomate = sopa_tomate + 1
                }else if(item2.sabor_sopa === "CEBOLLA"){
                    sopa_cebolla = sopa_cebolla + 1
                }
            }else if(item2.tipo.includes("PAN AJO")){
                pan_ajo = pan_ajo + parseInt(item2.tipo.replace( /^\D+/g, ''))          
            }else if(item2.tipo.includes("PAN 10")){
                pan_10_unidades = pan_10_unidades + paseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
               
            }else if(item2.tipo.includes("PAN 20")){
                pan_20_unidades = pan_20_unidades +  parseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
                    
            }else if(item2.tipo.includes("PAN COOK 2")){
                pancook_2_unidades = pancook_2_unidades + parseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
                           
            }else if(item2.tipo.includes("PAN COOK UNIDAD")){
                pancook_unidad = pancook_unidad + parseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
                      
            }else if(item2.tipo.includes("PAN UNIDAD")){
                pan_unidad = pan_unidad + parseInt( result.PAN_OREGANO - item2.tipo.replace( /^\D+/g, '') )             
            }else if(item2.tipo.includes("MASAS PER. 5")){
                masa_personal_cinco = masa_personal_cinco + parseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
                      
            }else if(item2.tipo.includes("MASAS MEDIANAS UNI")){
                masa_mediana_unidad = masa_mediana_unidad + parseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
                             
            }else if(item2.tipo.includes("SALSA 16 ONZAS")){
                salsa_16_onzas = salsa_16_onzas + parseInt(item2.tipo.replace( /^\D+/g, '').split(' X ')[1])
                             
            }else if(item2.tipo.includes("AGUA")){

                if(item2.tipo.includes("AGUA SIN GAS")){
                    agua_sin_gas = agua_sin_gas + parseInt(item2.tipo.replace( /^\D+/g, ''))      
                }else{
                    agua_con_gas = agua_con_gas + parseInt(item2.tipo.replace( /^\D+/g, ''))     
                }         
            }

        })
    })

    result_sum_tipo.push({'tipo_pedido': 'pizza_personal', 'No': pizza_personal }, 
                        {'tipo_pedido': 'pizza_grande', 'No': pizza_grande}, 
                        {'tipo_pedido':'pizza_pantalon', 'No': pizza_pantalon}, 
                        {'tipo_pedido': 'pizza_pancook', 'No': pizza_pancook},
                        {'tipo_pedido': 'pizza_lasagna', 'No': pizza_lasagna},
                        {'tipo_pedido': 'pizza_pasta_spagetti', 'No': pizza_pasta_spagetti},
                        {'tipo_pedido': 'pizza_pasta_fetuchini', 'No': pizza_pasta_fetuchini},
                        
                        {'tipo_pedido': 'cerveza_club', 'No': cerveza_club},
                        {'tipo_pedido': 'cerveza_aguila', 'No': cerveza_aguila},
                        {'tipo_pedido': 'cerveza_poker', 'No': cerveza_poker},
                        
                        {'tipo_pedido': 'cocacola_litro4', 'No': glitrocuarto},
                        {'tipo_pedido': 'cocacola_350_zero', 'No': gcocacolazero},
                        {'tipo_pedido': 'cocacola_350_normal', 'No': gcocacolanormal},
                        
                        {'tipo_pedido': 'jarra_limonada', 'No': jarra_limonada},
                        {'tipo_pedido': 'limonada', 'No': limonada},
                        {'tipo_pedido': 'jugo_mango', 'No': jugo_mango},
                        {'tipo_pedido': 'jugo_lulo', 'No': jugo_lulo},
                        {'tipo_pedido': 'jugo_lulada', 'No': jugo_lulada},
                        {'tipo_pedido': 'jugo_mora', 'No': jugo_mora},
                        
                        {'tipo_pedido': 'vino_botella_tinto', 'No': vino_botella_tinto},
                        {'tipo_pedido': 'vino_copa_tinto', 'No': vino_copa_tinto},
                        
                        {'tipo_pedido': 'cafe_bebida', 'No': cafe_bebida},
                        
                        {'tipo_pedido': 'sopa_pollo', 'No': sopa_pollo},
                        {'tipo_pedido': 'sopa_tomate', 'No': sopa_tomate},
                        {'tipo_pedido': 'sopa_cebolla', 'No': sopa_cebolla},
                        
                        {'tipo_pedido': 'pan_ajo', 'No': pan_ajo }, 
                        {'tipo_pedido': 'pan_10_unidades', 'No': pan_10_unidades}, 
                        {'tipo_pedido': 'pan_20_unidades', 'No': pan_20_unidades}, 
                        {'tipo_pedido': 'pancook_2_unidades', 'No': pancook_2_unidades},
                        {'tipo_pedido': 'pancook_unidad', 'No': pancook_unidad},
                        {'tipo_pedido': 'pan_unidad', 'No': pan_unidad},
                        {'tipo_pedido': 'masa_personal_cinco', 'No': masa_personal_cinco},
                        {'tipo_pedido': 'masa_mediana_unidad', 'No': masa_mediana_unidad},
                        
                        {'tipo_pedido': 'salsa_16_onzas', 'No': salsa_16_onzas},
                        
                        {'tipo_pedido': 'agua_con_gas', 'No': agua_con_gas},
                        {'tipo_pedido': 'agua_sin_gas', 'No': agua_sin_gas},)


    result_sum_tipo.map((item, index) => {
        if(item.No === 0){
            //console.log('0', item.tipo_pedido)
            result_sum_tipo.splice(index, 1)
        }
    })

    return {result, result_sum_ventas, result_sum_tipo}
}

module.exports = rute;