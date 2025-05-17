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

    let result_ventas_review_table = [];

    let pizza_personal = 0
    let pizza_costo_personal = 0

    let pizza_personal_promo = 0
    let pizza_costo_personal_promo = 0

    let pizza_grande = 0
    let pizza_costo_grande = 0

    let pizza_grande_promo = 0
    let pizza_costo_grande_promo = 0

    let pizza_pantalon = 0
    let pizza_pantalon_costo = 0

    let pizza_pancook = 0
    let pizza_pancook_costo = 0

    let pizza_lasagna = 0
    let pizza_lasagna_costo = 0

    let raviolis = 0
    let raviolis_costo = 0

    let pizza_pasta_spagetti = 0
    let pizza_pasta_spagetti_costo = 0

    let pizza_pasta_fetuchini = 0
    let pizza_pasta_fetuchini_costo = 0

    let cerveza_poker = 0
    let cerveza_poker_costo = 0

    let cerveza_ipa = 0
    let cerveza_ipa_costo = 0

    let cerveza_trigo = 0
    let cerveza_trigo_costo = 0

    let cerveza_cannabis = 0
    let cerveza_cannabis_costo = 0

    let cerveza_imperial = 0
    let cerveza_imperial_costo = 0

    let cerveza_club = 0
    let cerveza_club_costo = 0

    let cerveza_aguila = 0
    let cerveza_aguila_costo = 0

    let glitrocuarto = 0
    let glitrocuarto_costo = 0

    let gcocacolazero = 0
    let gcocacolazero_costo = 0

    let gcocacolanormal = 0
    let gcocacolanormal_costo = 0

    let limonada = 0
    let limonada_costo = 0

    let jarra_limonada = 0
    let jarra_limonada_costo = 0
    
    let jugo_mora = 0
    let jugo_mora_costo = 0
    
    let jugo_mango = 0
    let jugo_mango_costo = 0
    
    let jugo_lulo = 0
    let jugo_lulo_costo = 0
    
    let jugo_lulada = 0
    let jugo_lulada_costo = 0

    let aromatica_mansanilla = 0
    let aromatica_mansanilla_costo = 0

    let aromatica_frutos_rojos = 0
    let aromatica_frutos_rojos_costo = 0

    let aromatica_yerba_buena = 0
    let aromatica_yerba_buena_costo = 0

    let vino_botella_tinto = 0
    let vino_botella_tinto_costo = 0    

    let vino_copa_tinto = 0
    let vino_copa_tinto_costo = 0

    let cafe_bebida = 0
    let cafe_bebida_costo = 0

    let cafe_expreso_pequeno = 0
    let cafe_expreso_pequeno_costo = 0

    let cafe_expreso_grande = 0
    let cafe_expreso_grande_costo = 0

    let cafe_americano_grande = 0
    let cafe_americano_grande_costo = 0

    let cafe_americano_pequeno = 0
    let cafe_americano_pequeno_costo = 0

    let cafe_capuchino_grande = 0
    let cafe_capuchino_grande_costo = 0

    let cafe_capuchino_pequeno = 0
    let cafe_capuchino_pequeno_costo = 0

    let sopa_pollo = 0
    let sopa_pollo_costo = 0
    let sopa_tomate = 0
    let sopa_tomate_costo = 0
    let sopa_cebolla = 0
    let sopa_cebolla_costo = 0
    let sopa_verduras = 0
    let sopa_verduras_costo = 0

    let pan_ajo = 0
    let pan_ajo_costo = 0
    let pan_10_unidades = 0
    let pan_10_unidades_costo = 0
    let pan_20_unidades = 0
    let pan_20_unidades_costo = 0
    let pancook_2_unidades = 0
    let pancook_2_unidades_costo = 0
    let pancook_unidad = 0
    let pancook_unidad_costo = 0
    let pan_unidad = 0
    let pan_unidad_costo = 0
    let masa_personal_cinco = 0
    let masa_personal_cinco_costo = 0
    let masa_mediana_unidad = 0
    let masa_mediana_unidad_costo = 0

    let salsa_16_onzas = 0
    let salsa_16_onzas_costo = 0

    let agua_con_gas = 0
    let agua_con_gas_costo = 0
    let agua_sin_gas = 0
    let agua_sin_gas_costo = 0

    let desayuno_huesped = 0
    let desayuno_huesped_costo = 0
    let desayuno_americano = 0
    let desayuno_americano_costo = 0

    let total_acum_costo = 0

    //Pizza festival

    let pizza_festival = 0
    let costo_pizza_festival = 0


    result = await PedidoPizzarra.find({
        $and:[{"aux.fecha_pedido": fecha_aux}, {"aux.local": pedidos_aux}] 
    });

    let result_sum_ventas = 0;
    let result_sum_ventas_domis = 0;
    let result_sum_room_service = 0;
    let count_room_service = 0;
    let count_domicilios = 0;

    result.map((item, index) => {

        if(item.aux[0].costo_pedido === 1){
            item.pedido.map((item2, index2) => {                
                let key = Object.keys(item2).find(key => key.includes('costo'))                
                item2[key] = 0                
            })     
        }


        item.aux.map((item2, index2) => {
            //console.log(item2)
            if(item2.costo_pedido === 1){
            }else{
                //find if key exists
                if(item2.hasOwnProperty('domi_costo')){
                    result_sum_ventas_domis = result_sum_ventas_domis + parseInt(item2.domi_costo)
                    count_domicilios = count_domicilios + 1
                }

                if(item2.tipo_pedido === "ROOM SERVICE"){
                    result_sum_room_service = result_sum_room_service + 10000
                    count_room_service = count_room_service + 1
                }
                result_sum_ventas = result_sum_ventas + item2.costo_pedido
            }            
        })
    })

    result_sum_ventas = result_sum_ventas + result_sum_ventas_domis

    //Suma por tipo
    result.map((item, index) => { 
        item.pedido.map((item2, index2) => {   
            //productoConsoler(item2)
            if( item2.tipo.includes('PIZZA PERSONAL') && !item2.tipo.includes('PROMOCION')){
                pizza_costo_personal = pizza_costo_personal + item2.costo_personal + item2.costo_adiciones
                pizza_personal = pizza_personal + 1   
            }else if(item2.tipo.includes('PIZZA PERSONAL') && item2.tipo.includes('PROMOCION')){
                pizza_personal = pizza_personal + 1
                pizza_personal_promo = pizza_personal_promo + 1
                pizza_costo_personal = pizza_costo_personal + item2.costo_personal + item2.costo_adiciones
                pizza_costo_personal_promo = pizza_costo_personal_promo + item2.costo_personal + item2.costo_adiciones   
            }else if( item2.tipo.includes('PIZZA GRANDE') && !item2.tipo.includes('PROMOCION')){
                pizza_costo_grande = pizza_costo_grande + item2.costo_grande + item2.costo_adiciones_grande
                pizza_grande = pizza_grande + 1
            }else if( item2.tipo.includes('PIZZA GRANDE') && item2.tipo.includes('PROMOCION')){
                pizza_grande_promo = pizza_grande_promo + 1
                pizza_grande = pizza_grande + 1
                pizza_costo_grande = pizza_costo_grande + item2.costo_grande + item2.costo_adiciones_grande
                pizza_costo_grande_promo = pizza_costo_grande_promo + item2.costo_grande + item2.costo_adiciones_grande
            }else if( item2.tipo.includes('PANTALON') ){
                pizza_pantalon_costo = pizza_pantalon_costo + item2.costo_pantalon + item2.costo_adiciones_pantalon
                pizza_pantalon = pizza_pantalon + 1
            }else if( item2.tipo.includes('PANCOOK') ){
                pizza_pancook_costo = pizza_pancook_costo + item2.costo_pancook + item2.costo_adiciones_pancook
                pizza_pancook = pizza_pancook + 1
            }else if( item2.tipo.includes('PASTA TIPO: FETUCCINI') ){
                pizza_pasta_fetuchini_costo = pizza_pasta_fetuchini_costo + item2.costo_pasta + item2.costo_adiciones_pasta
                pizza_pasta_fetuchini = pizza_pasta_fetuchini + 1
            }else if( item2.tipo.includes('PASTA TIPO: SPAGHETTI') ){
                pizza_pasta_spagetti_costo = pizza_pasta_spagetti_costo + item2.costo_pasta + item2.costo_adiciones_pasta
                pizza_pasta_spagetti = pizza_pasta_spagetti + 1
            }else if( item2.tipo.includes('LASAGNA SALSA') ){
                pizza_lasagna_costo = pizza_lasagna_costo + item2.costo_lasagna + item2.costo_adiciones_lasagna
                pizza_lasagna = pizza_lasagna + 1
            }else if( item2.tipo.includes('RAVIOLI SALSA') ){
                raviolis_costo = raviolis_costo + item2.costo_ravioli + item2.costo_adiciones_ravioli
                raviolis = raviolis + 1
            }else if(item2.tipo.includes("CLUB")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_club_costo = cerveza_club_costo + item2.costo_cerveza
                cerveza_club = cerveza_club + + parseInt(cvz[1])     
            }else if(item2.tipo.includes("POKER")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_poker_costo = cerveza_poker_costo + item2.costo_cerveza
                cerveza_poker = cerveza_poker + parseInt(cvz[1])
            }else if(item2.tipo.includes("AGUILA")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_aguila_costo = cerveza_aguila_costo + item2.costo_cerveza
                cerveza_aguila = cerveza_aguila + parseInt(cvz[1])        
            }else if(item2.tipo.includes("IPA")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_ipa_costo = cerveza_ipa_costo + item2.costo_cerveza
                cerveza_ipa = cerveza_ipa + parseInt(cvz[1])        
            }else if(item2.tipo.includes("TRIGO")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_trigo_costo = cerveza_trigo_costo + item2.costo_cerveza
                cerveza_trigo = cerveza_trigo + parseInt(cvz[1])
            }else if(item2.tipo.includes("CANNABIS")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_cannabis_costo = cerveza_cannabis_costo + item2.costo_cerveza
                cerveza_cannabis = cerveza_cannabis + parseInt(cvz[1])
            }else if(item2.tipo.includes("IMPERIAL")){
                let cvz = item2.tipo.split("X", 2)
                cerveza_imperial_costo = cerveza_imperial_costo + item2.costo_cerveza
                cerveza_imperial = cerveza_imperial + parseInt(cvz[1])
            }else if(item2.tipo.includes("LITRO/4")){
                //console.log(item2)
                glitrocuarto_costo = glitrocuarto_costo + item2.costo_gaseosa
                let glt4 = item2.tipo.split("X", 2)
                glitrocuarto = glitrocuarto + parseInt(glt4[1])
            }else if(item2.tipo.includes("COLA ZERO")){
                gcocacolazero_costo = gcocacolazero_costo + item2.costo_gaseosa
                let g350 = item2.tipo.split("X", 2)
                gcocacolazero = gcocacolazero + parseInt(g350[1])
            }else if(item2.tipo.includes("COLA 350")){
                gcocacolanormal_costo = gcocacolanormal_costo + item2.costo_gaseosa
                let g350 = item2.tipo.split("X", 2)
                gcocacolanormal = gcocacolanormal + parseInt(g350[1])
            }else if(item2.tipo.includes("AROMATICA MANSANILLA")){
                aromatica_mansanilla_costo = aromatica_mansanilla_costo + item2.costo_bebida
                let a_mansanilla = item2.tipo.split("X", 2)
                aromatica_mansanilla = aromatica_mansanilla + parseInt(a_mansanilla[1])
            }else if(item2.tipo.includes("AROMATICA FRUTOS ROJOS")){
                aromatica_frutos_rojos_costo = aromatica_frutos_rojos_costo + item2.costo_bebida
                let a_frutos_rojos = item2.tipo.split("X", 2)
                aromatica_frutos_rojos = aromatica_frutos_rojos + parseInt(a_frutos_rojos[1])
            }else if(item2.tipo.includes("AROMATICA YERBE BUENA")){
                aromatica_yerba_buena_costo = aromatica_yerba_buena_costo + item2.costo_bebida
                let a_yerbe_buena = item2.tipo.split("X", 2)
                aromatica_yerba_buena = aromatica_yerba_buena + parseInt(a_yerbe_buena[1])
            }else if(item2.tipo.includes("JUGO")){
                if(item2.tipo.includes("LIMONADA")){
                    if(item2.tipo.includes("JARRA")){
                        jarra_limonada_costo = jarra_limonada_costo + item2.costo_jugo
                        jarra_limonada = jarra_limonada + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else{
                        limonada_costo = limonada_costo + item2.costo_jugo
                        limonada = limonada + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }else{
                    
                    if(item2.tipo.includes("MANGO")){
                        jugo_mango_costo = jugo_mango_costo + item2.costo_jugo
                        jugo_mango = jugo_mango + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else if(item2.tipo.includes("LULO")){
                        jugo_lulo_costo = jugo_lulo_costo + item2.costo_jugo
                        jugo_lulo = jugo_lulo + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else if(item2.tipo.includes("LULADA")){
                        jugo_lulada_costo = jugo_lulada_costo + item2.costo_jugo
                        jugo_lulada = jugo_lulada + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else if(item2.tipo.includes("MORA")){
                        jugo_mora_costo = jugo_mora_costo + item2.costo_jugo
                        jugo_mora = jugo_mora + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }  
            }else if(item2.tipo.includes("VINO")){

                if(item2.tipo.includes("BOTELLA")){
                    vino_botella_tinto_costo = vino_botella_tinto_costo + item2.costo_vino
                    vino_botella_tinto = vino_botella_tinto + parseInt(item2.tipo.replace( /^\D+/g, '')) 
                }else{
                    vino_copa_tinto_costo = vino_copa_tinto_costo + item2.costo_vino
                    vino_copa_tinto = vino_copa_tinto + parseInt(item2.tipo.replace( /^\D+/g, ''))
                }   
            }else if(item2.tipo.includes("CAFÉ")){

                if(item2.tipo.includes("Expreso")){
                    if(item2.tipo.includes("Grande")){
                        cafe_expreso_grande_costo = cafe_expreso_grande_costo + item2.costo_tinto
                        cafe_expreso_grande = cafe_expreso_grande + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else{
                        cafe_expreso_pequeno_costo = cafe_expreso_pequeno_costo + item2.costo_tinto
                        cafe_expreso_pequeno = cafe_expreso_pequeno + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }else if(item2.tipo.includes("Tinto")){
                    cafe_bebida_costo = cafe_bebida_costo + item2.costo_tinto
                    cafe_bebida = cafe_bebida + parseInt(item2.tipo.replace( /^\D+/g, ''))
                }else if(item2.tipo.includes("Capuccino")){
                    if(item2.tipo.includes("Grande")){
                        cafe_capuchino_grande_costo = cafe_capuchino_grande_costo + item2.costo_tinto
                        cafe_capuchino_grande = cafe_capuchino_grande + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else{
                        cafe_capuchino_pequeno_costo = cafe_capuchino_pequeno_costo + item2.costo_tinto
                        cafe_capuchino_pequeno = cafe_capuchino_pequeno + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }else if(item2.tipo.includes("Americano")){
                    if(item2.tipo.includes("Grande")){
                        cafe_americano_grande_costo = cafe_americano_grande_costo + item2.costo_tinto
                        cafe_americano_grande = cafe_americano_grande + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }else{
                        cafe_americano_pequeno_costo = cafe_americano_pequeno_costo + item2.costo_tinto
                        cafe_americano_pequeno = cafe_americano_pequeno + parseInt(item2.tipo.replace( /^\D+/g, ''))
                    }
                }
            }else if(item2.tipo.includes("SOPA")){
                if(item2.sabor_sopa === "POLLO"){
                    sopa_pollo_costo = sopa_pollo_costo + item2.costo_sopa + item2.costo_adiciones_sopa
                    sopa_pollo = sopa_pollo + 1
                }else if(item2.sabor_sopa === "TOMATE"){
                    sopa_tomate_costo = sopa_tomate_costo + item2.costo_sopa + item2.costo_adiciones_sopa
                    sopa_tomate = sopa_tomate + 1
                }else if(item2.sabor_sopa === "CEBOLLA"){
                    sopa_cebolla_costo = sopa_cebolla_costo + item2.costo_sopa + item2.costo_adiciones_sopa
                    sopa_cebolla = sopa_cebolla + 1
                }else if(item2.sabor_sopa === "VERDURAS"){
                    sopa_verduras_costo = sopa_verduras_costo + item2.costo_sopa + item2.costo_adiciones_sopa
                    sopa_verduras = sopa_verduras + 1
                }
            }else if(item2.tipo.includes("PAN AJO")){
                pan_ajo_costo = pan_ajo_costo + item2.costo_pan_ajo
                pan_ajo = pan_ajo + parseInt(item2.tipo.replace( /^\D+/g, ''))          
            }else if(item2.tipo.includes("PIZZA FESTIVAL")){
                costo_pizza_festival = costo_pizza_festival + item2.costo_pizza_festival
                pizza_festival = pizza_festival + parseInt(item2.tipo.replace( /^\D+/g, ''))          
            }else if(item2.tipo.includes("PAN 10")){ 
                pan_10_unidades_costo = pan_10_unidades_costo + item2.costo_panaderia              
                let panCantidadAux = item2.tipo.split('X', 2)[1]               
                pan_10_unidades = pan_10_unidades + parseInt(panCantidadAux)               
            }else if(item2.tipo.includes("PAN 20")){
                pan_20_unidades_costo = pan_20_unidades_costo + item2.costo_panaderia
                pan_20_unidades = pan_20_unidades +  parseInt(item2.tipo.replace( /^\D+/g, '').split(' X '))
            }else if(item2.tipo.includes("PAN COOK 2")){
                pancook_2_unidades_costo = pancook_2_unidades_costo + item2.costo_panaderia
                pancook_2_unidades = pancook_2_unidades + parseInt(item2.tipo.split(' X ')[1])
            }else if(item2.tipo.includes("PAN COOK UNIDAD")){
                pancook_unidad_costo = pancook_unidad_costo + item2.costo_panaderia
                pancook_unidad = pancook_unidad + parseInt(item2.tipo.split(' X ')[1])
            }else if(item2.tipo.includes("PAN UNIDAD")){
                pan_unidad_costo = pan_unidad_costo + item2.costo_panaderia
                pan_unidad = pan_unidad +  parseInt(item2.tipo.replace( /^\D+/g, ''))           
            }else if(item2.tipo.includes("MASAS PER. 5")){
                masa_personal_cinco_costo = masa_personal_cinco_costo + item2.costo_panaderia
                masa_personal_cinco = masa_personal_cinco + parseInt(item2.tipo.split(' X ')[1])
            }else if(item2.tipo.includes("MASAS MEDIANAS UNI")){
                masa_mediana_unidad_costo = masa_mediana_unidad_costo + item2.costo_panaderia
                masa_mediana_unidad = masa_mediana_unidad + parseInt(item2.tipo.split(' X ')[1])
            }else if(item2.tipo.includes("SALSA 16 ONZAS")){
                salsa_16_onzas_costo = salsa_16_onzas_costo + item2.costo_otros
                salsa_16_onzas = salsa_16_onzas + parseInt(item2.tipo.split(' X ')[1])         
            }else if(item2.tipo.includes("AGUA")){

                if(item2.tipo.includes("AGUA SIN GAS")){
                    agua_sin_gas_costo = agua_sin_gas_costo + item2.costo_bebida
                    agua_sin_gas = agua_sin_gas + parseInt(item2.tipo.replace( /^\D+/g, ''))      
                }else{
                    agua_con_gas_costo = agua_con_gas_costo + item2.costo_bebida
                    agua_con_gas = agua_con_gas + parseInt(item2.tipo.replace( /^\D+/g, ''))     
                }         
            }else if(item2.tipo.includes("HUESPED")){
                desayuno_huesped_costo = desayuno_huesped_costo + item2.costo_desayuno_huesped + item2.costo_adiciones_huesped
                desayuno_huesped = desayuno_huesped + parseInt(item2.tipo.replace( /^\D+/g, ''))  
            }else if(item2.tipo.includes("AMERICANO")){
                desayuno_americano_costo = desayuno_americano_costo + item2.costo_desayuno_americano + item2.costo_adiciones_americano
                desayuno_americano = desayuno_americano + parseInt(item2.tipo.replace( /^\D+/g, ''))
            }
        })
    })

    result_sum_tipo.push({'tipo_pedido': 'pizza_personal', 'No': pizza_personal, 'Costo': pizza_costo_personal}, 
                        {'tipo_pedido': 'pizza_grande', 'No': pizza_grande, 'Costo': pizza_costo_grande }, 
                        //{'tipo_pedido': 'pizza_personal_promocion', 'No': pizza_personal_promo , 'Costo': pizza_costo_personal_promo },
                        //{'tipo_pedido': 'pizza_grande_promocion', 'No': pizza_grande_promo, 'Costo': pizza_costo_grande_promo },
                        {'tipo_pedido':'pizza_pantalon', 'No': pizza_pantalon,  'Costo': pizza_pantalon_costo }, 
                        {'tipo_pedido': 'pizza_pancook', 'No': pizza_pancook, 'Costo': pizza_pancook_costo },
                        {'tipo_pedido': 'pizza_lasagna', 'No': pizza_lasagna, 'Costo': pizza_lasagna_costo },
                        {'tipo_pedido': 'pizza_ravioli', 'No': raviolis, 'Costo': raviolis_costo },
                        {'tipo_pedido': 'pizza_pasta_spaghetti', 'No': pizza_pasta_spagetti, 'Costo': pizza_pasta_spagetti_costo },
                        {'tipo_pedido': 'pizza_pasta_fetuccini', 'No': pizza_pasta_fetuchini,  'Costo': pizza_pasta_fetuchini_costo },
                        
                        {'tipo_pedido': 'cerveza_club', 'No': cerveza_club, 'Costo': cerveza_club_costo },
                        {'tipo_pedido': 'cerveza_aguila', 'No': cerveza_aguila, 'Costo': cerveza_aguila_costo },
                        {'tipo_pedido': 'cerveza_poker', 'No': cerveza_poker, 'Costo': cerveza_poker_costo },
                        
                        {'tipo_pedido': 'cocacola_litro4', 'No': glitrocuarto, 'Costo': glitrocuarto_costo },
                        {'tipo_pedido': 'cocacola_350_zero', 'No': gcocacolazero, 'Costo': gcocacolazero_costo },
                        {'tipo_pedido': 'cocacola_350_normal', 'No': gcocacolanormal, 'Costo': gcocacolanormal_costo },
                        
                        {'tipo_pedido': 'jarra_limonada', 'No': jarra_limonada, 'Costo': jarra_limonada_costo },
                        {'tipo_pedido': 'limonada', 'No': limonada, 'Costo': limonada_costo },
                        {'tipo_pedido': 'jugo_mango', 'No': jugo_mango, 'Costo': jugo_mango_costo },
                        {'tipo_pedido': 'jugo_lulo', 'No': jugo_lulo, 'Costo': jugo_lulo_costo },
                        {'tipo_pedido': 'jugo_lulada', 'No': jugo_lulada, 'Costo': jugo_lulada_costo },
                        {'tipo_pedido': 'jugo_mora', 'No': jugo_mora, 'Costo': jugo_mora_costo },
                        {'tipo_pedido': 'aromatica_mansanilla', 'No': aromatica_mansanilla, 'Costo': aromatica_mansanilla_costo },
                        {'tipo_pedido': 'aromatica_frutos_rojos', 'No': aromatica_frutos_rojos, 'Costo': aromatica_frutos_rojos_costo },
                        {'tipo_pedido': 'aromatica_yerbe_buena', 'No': aromatica_yerba_buena, 'Costo': aromatica_yerba_buena_costo },
                        
                        {'tipo_pedido': 'vino_botella_tinto', 'No': vino_botella_tinto, 'Costo': vino_botella_tinto_costo },
                        {'tipo_pedido': 'copa_vino_tinto', 'No': vino_copa_tinto, 'Costo': vino_copa_tinto_costo },
                        
                        {'tipo_pedido': 'cafe_tinto', 'No': cafe_bebida, 'Costo': cafe_bebida_costo },
                        {'tipo_pedido': 'cafe_americano_pequeno', 'No': cafe_americano_pequeno, 'Costo': cafe_americano_pequeno_costo },
                        {'tipo_pedido': 'cafe_americano_grande', 'No': cafe_americano_grande, 'Costo': cafe_americano_grande_costo },
                        {'tipo_pedido': 'cafe_capuccino_pequeno', 'No': cafe_capuchino_pequeno, 'Costo': cafe_capuchino_pequeno_costo },
                        {'tipo_pedido': 'cafe_capuccino_grande', 'No': cafe_capuchino_grande, 'Costo': cafe_capuchino_grande_costo },
                        {'tipo_pedido': 'cafe_expreso_pequeno', 'No': cafe_expreso_pequeno, 'Costo': cafe_expreso_pequeno_costo },
                        {'tipo_pedido': 'cafe_expreso_grande', 'No': cafe_expreso_grande, 'Costo': cafe_expreso_grande_costo },
                        
                        {'tipo_pedido': 'pollo_sopa', 'No': sopa_pollo, 'Costo': sopa_pollo_costo },
                        {'tipo_pedido': 'tomate_sopa', 'No': sopa_tomate, 'Costo': sopa_tomate_costo },
                        {'tipo_pedido': 'cebolla_sopa', 'No': sopa_cebolla, 'Costo': sopa_cebolla_costo },
                        {'tipo_pedido': 'verduras_sopa', 'No': sopa_verduras, 'Costo': sopa_verduras_costo },
                        
                        {'tipo_pedido': 'pan_ajo', 'No': pan_ajo, 'Costo': pan_ajo_costo}, 
                        {'tipo_pedido': 'pizza_festival', 'No': pizza_festival, 'Costo': costo_pizza_festival}, 
                        {'tipo_pedido': 'pan_10_unidades', 'No': pan_10_unidades, 'Costo': pan_10_unidades_costo }, 
                        {'tipo_pedido': 'pan_20_unidades', 'No': pan_20_unidades, 'Costo': pan_20_unidades_costo }, 
                        {'tipo_pedido': 'pancook_2_unidades', 'No': pancook_2_unidades, 'Costo': pancook_2_unidades_costo },
                        {'tipo_pedido': 'pancook_unidad', 'No': pancook_unidad, 'Costo': pancook_unidad_costo },
                        {'tipo_pedido': 'pan_unidad', 'No': pan_unidad, 'Costo': pan_unidad_costo },
                        {'tipo_pedido': 'masa_personal_cinco', 'No': masa_personal_cinco, 'Costo': masa_personal_cinco_costo },
                        {'tipo_pedido': 'masa_mediana_unidad', 'No': masa_mediana_unidad, 'Costo': masa_mediana_unidad_costo },
                        
                        {'tipo_pedido': 'salsa_16_onzas', 'No': salsa_16_onzas, 'Costo': salsa_16_onzas_costo },
                        
                        {'tipo_pedido': 'agua_con_gas', 'No': agua_con_gas, 'Costo': agua_con_gas_costo },
                        {'tipo_pedido': 'agua_sin_gas', 'No': agua_sin_gas, 'Costo': agua_sin_gas_costo },

                        {'tipo_pedido': 'desayuno_huesped', 'No': desayuno_huesped, 'Costo': desayuno_huesped_costo },
                        {'tipo_pedido': 'desayuno_americano', 'No': desayuno_americano, 'Costo': desayuno_americano_costo},
                        {'tipo_pedido': 'domicilios', 'No': count_domicilios, 'Costo': result_sum_ventas_domis},
                        {'tipo_pedido': 'room_service', 'No': count_room_service, 'Costo': result_sum_room_service})


    result_sum_tipo = result_sum_tipo.filter(function (el) {
        return el.No != 0;
    });

    let result_sum_ventas_aux = result_sum_tipo.reduce(function(prev, current) {
        return prev + +current.Costo
    }, 0);
    
    result_sum_tipo.push({'tipo_pedido': 'TOTAL', 'No': 'Total ventas', 'Costo': result_sum_ventas_aux})

    return {result, result_sum_ventas, result_sum_tipo}
}

function productoConsoler(item2){
    let keyProductos = item2.tipo;
    if (keyProductos.includes("RAVIOLI") || keyProductos.includes("LASAGNA") || keyProductos.includes("PASTA")) {
        keyProductos = item2.tipo.split(" ")[0];

    }
    switch (keyProductos) {
        case 'PIZZA PERSONAL COMPLETA':
            //console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_personal);
            break;
        case 'PIZZA PERSONAL MITAD':
            //console.log("Producto: ", item2.tipo, "Sabor mitad uno/dos: ", item2.mitad_uno, "/", item2.mitad_dos);  
            break;
        case 'PIZZA GRANDE COMPLETA':
            //console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_grande);
            break;	
        case 'PIZZA GRANDE MITAD':
           // console.log("Producto: ", item2.tipo, "Sabor mitad uno/dos: ", item2.mitad_uno, "/", item2.mitad_dos);  
            break;
        case 'PIZZA GRANDE CUARTO':
           // console.log("Producto: ", item2.tipo, "Sabor cuarto uno/dos/tres/cuatro: ", item2.cuarto_uno, "/", item2.cuarto_dos, "/", item2.cuarto_tres, "/", item2.cuarto_cuatro);  
            break;
        case 'PIZZA GRANDE COMPLETA PROMOCION':
           // console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_grande);
            break;
        case 'PIZZA GRANDE MITAD PROMOCION':
           // console.log("Producto: ", item2.tipo, "Sabor mitad uno/dos: ", item2.mitad_uno, "/", item2.mitad_dos);  
            break;
        case 'PIZZA GRANDE CUARTO PROMOCION':
           // console.log("Producto: ", item2.tipo, "Sabor cuarto uno/dos/tres/cuatro: ", item2.cuarto_uno, "/", item2.cuarto_dos, "/", item2.cuarto_tres, "/", item2.cuarto_cuatro);  
            break;
        case 'PIZZA PANCOOK':
           // console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_pancook);
            break;
        case 'PIZZA PANTALON':
           // console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_pantalon);
            break;
        case 'RAVIOLI':
           // console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_ravioli);
            break;
        case 'LASAGNA':
           // console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_lasagna);
            break;
        case 'PASTA':
           // console.log("Producto: ", item2.tipo, "Sabor: ",item2.sabor_pasta);
            break;
        default:
            break;
    }
}

module.exports = rute;