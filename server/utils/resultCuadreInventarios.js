const filterArray = require('./functionsUtils');

function resultVentasPeriodo(result_ventas_auxn, insumos, insumos_tipo){
    let result = [];
    let cajasPizzaPersonales = 0;
    let cajasPizzaGrandes = 0;
    let moldesLasagna = 0;

    insumos.map((item, index) => {
        let item_aux = item.TIPO
        result = {...result, [item_aux]: 0}
    })

    result_ventas_auxn.map((item, index) => {

        item.aux.map((item1,index) => {
            

            //console.log(item1)
            if(item1.tipo_pedido === "DOMICILIO"){
                cajasPizzaPersonales = 1;
                cajasPizzaGrandes = 1;
                moldesLasagna = 1;
            }else{
                cajasPizzaPersonales = 0;
                cajasPizzaGrandes = 0;
                moldesLasagna = 0;
            }

            item.pedido.map((item, index) => { 

                //console.log(item.tipo)
                //console.log(index) 

                if(item.tipo.includes("DESAYUNO AMERICANO")){
                    let desAux = item.tipo.split("X")[1]
                    let huevosAux = 2

                    if(item.desayuno_tipo_huevos === "Pericos"){
                        result.CEBOLLA_LARGA = result.CEBOLLA_LARGA - desAux * 30
                        result.TOMATE = result.TOMATE - desAux * 30
                    }

                    if(item.desayuno_tipo_bebida === "Cafe"){
                        result.CAFE = result.CAFE - desAux * 30
                    }

                    if(item.desayuno_tipo_bebida === "Chocolate"){
                        result.CHOCOLATE = result.CHOCOLATE - desAux * 30
                    }

                    if(item.desayuno_tipo_bebida === "Agua Aromatica"){
                        result.AGUA_AROMATICA = result.AGUA_AROMATICA - desAux * 1
                    }

                    if(item.desayuno_tipo_bebida === "Te"){
                        result.TE = result.TE - desAux * 1
                    }
                    
                    result.HUEVOS = result.HUEVOS - desAux * 2
                    result.LECHE = result.LECHE - desAux * 50
                    result.PAN_OREGANO = result.PAN_OREGANO - desAux * 1
                    result.PROMASA = result.PROMASA - desAux * 25 
                    result.MANTEQUILLA = result.MANTEQUILLA - desAux * 15 
                    
                    //Ingrediente adicional
                    let adicionGramos = 30 * desAux
                    let numAdiciones = item.mod_sabor_desayuno.split("+").length - 1
                    let Adiciones = item.mod_sabor_desayuno.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                if(item.tipo.includes("DESAYUNO HUESPED")){
                    let desAux = item.tipo.split("X")[1]
                    let huevosAux = 2
                    
                    result.HUEVOS = result.HUEVOS - desAux * 2
                    result.LECHE = result.LECHE - desAux * 50
                    result.PAN_OREGANO = result.PAN_OREGANO - desAux * 1
                    result.PROMASA = result.PROMASA - desAux * 25 
                    result.MANTEQUILLA = result.MANTEQUILLA - desAux * 15 
                    

                    if(item.desayuno_tipo_huevos === "Pericos"){
                        result.CEBOLLA_LARGA = result.CEBOLLA_LARGA - desAux * 30
                        result.TOMATE = result.TOMATE - desAux * 30
                    }

                    if(item.desayuno_tipo_bebida === "Cafe"){
                        result.CAFE = result.CAFE - desAux * 30
                    }

                    if(item.desayuno_tipo_bebida === "Chocolate"){
                        result.CHOCOLATE = result.CHOCOLATE - desAux * 30
                    }

                    if(item.desayuno_tipo_bebida === "Agua Aromatica"){
                        result.AGUA_AROMATICA = result.AGUA_AROMATICA - desAux * 1
                    }

                    if(item.desayuno_tipo_bebida === "Te"){
                        result.TE = result.TE - desAux * 1
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30 * desAux
                    let numAdiciones = item.mod_sabor_desayuno.split("+").length - 1
                    let Adiciones = item.mod_sabor_desayuno.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                if(item.tipo.includes("PIZZA PERSONAL COMPLETA")){                   
                    
                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_PERSONALES = result.CAJAS_PERSONALES - 1
                    }
                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 60

                    let dosIng = 50;
                    let tresIng = 33.33;
                    let queso = 75;
        
                    if(item.sabor_personal === "MIXTA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1     
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "HAWAIANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "HIGOSTOCINETA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "POLLOCHAMPI"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "JAMONCHAMPI"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "SAMBA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "PETETE"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.POLLO = result.POLLO - 50
                        result.TOCINETA = result.TOCINETA - 50
                        result.TOMATE = result.TOMATE - 50
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "CAMPESINA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "NAPOLITANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.QUESO = result.QUESO - queso * 2
                    }else if(item.sabor_personal === "MARGARITA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - queso * 2
                    }else if(item.sabor_personal === "GOURMET"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.POLLO = result.POLLO - 50
                        result.ACEITUNAS = result.ACEITUNAS - 25
                        result.TOMATES_SECOS = result.TOMATES_SECOS - 25
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "PADRISIMA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        result.LECHUGA = result.LECHUGA - 20
                        result.TOMATE = result.TOMATE - 20

                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "VEGETARIANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
        
                        result.ACEITUNAS = result.ACEITUNAS - 20
                        result.TOMATES_SECOS = result.TOMATES_SECOS - 20
                        result.CHAMPINIONES = result.CHAMPINIONES - 20
                        result.CEBOLLA = result.CEBOLLA - 20
                        result.PIMENTON = result.PIMENTON - 20
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_personal === "FESTIVAL"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1

                        result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 60  
                        result.CHAMPINIONES = result.CHAMPINIONES - 75  
                        result.JAMON = result.JAMON - 75
                        result.SALAMI = result.SALAMI - 75   
                        result.QUESO = result.QUESO - 75

                    }else if(item.sabor_personal.includes("Combinada 2 Ingredientes")){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
                        result.QUESO = result.QUESO - queso

                        let ing01 = item.sabor_personal.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.sabor_personal.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.sabor_personal.includes("Combinada 3 Ingredientes")){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1 
                        result.QUESO = result.QUESO - queso

                        let ing01 = item.sabor_personal.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.sabor_personal.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.sabor_personal.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdiciones = item.mod_sabor_personal.split("+").length - 1
                    let Adiciones = item.mod_sabor_personal.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                // find PIZZA GRANDE in item

                //PIZZA PERSONAL POR MITADES
                if(item.tipo.includes("PIZZA PERSONAL MITAD")){

                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_PERSONALES = result.CAJAS_PERSONALES - 1
                    }

                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 60
                    let dosIng = 25;
                    let tresIng = 16.66;
                    let quesoM = 37.5;

                    if(item.mitad_uno === "MIXTA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "HAWAIANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "HIGOSTOCINETA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "POLLOCHAMPI"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "JAMONCHAMPI"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "SAMBA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "PETETE"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "CAMPESINA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "NAPOLITANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_uno === "MARGARITA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_uno === "GOURMET"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "PADRISIMA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3

                        result.JALAPENIOS = result.JALAPENIOS - 10
                        result.LECHUGA = result.LECHUGA - 10
                        result.TOMATE = result.TOMATE - 10

                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "VEGETARIANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "FESTIVAL"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2
 
                        result.CHAMPINIONES = result.CHAMPINIONES - 75/2  
                        result.JAMON = result.JAMON - 75/2
                        result.SALAMI = result.SALAMI - 75/2   
                        result.QUESO = result.QUESO - 75/2

                    }else if(item.mitad_uno.includes("Combinada 2 Ingredientes")){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_uno.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.mitad_uno.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.mitad_uno.includes("Combinada 3 Ingredientes")){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_uno.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.mitad_uno.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.mitad_uno.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }
                
                    if(item.mitad_dos === "MIXTA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "HAWAIANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "HIGOSTOCINETA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "POLLOCHAMPI"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "JAMONCHAMPI"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "SAMBA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "PETETE"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "CAMPESINA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "NAPOLITANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_dos === "MARGARITA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_dos === "GOURMET"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "PADRISIMA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 10
                        result.LECHUGA = result.LECHUGA - 10
                        result.TOMATE = result.TOMATE - 10
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "VEGETARIANA"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2  
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "FESTIVAL"){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2
 
                        result.CHAMPINIONES = result.CHAMPINIONES - 75/2  
                        result.JAMON = result.JAMON - 75/2
                        result.SALAMI = result.SALAMI - 75/2   
                        result.QUESO = result.QUESO - 75/2

                    }else if(item.mitad_dos.includes("Combinada 2 Ingredientes")){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_dos.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.mitad_dos.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.mitad_dos.includes("Combinada 3 Ingredientes")){
                        result.MASAS_PERSONALES = result.MASAS_PERSONALES - 1/2 
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_dos.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.mitad_dos.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.mitad_dos.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 15
                    let numAdicionesm1 = item.mod_mitad_uno.split("+").length - 1
                    let numAdicionesm2 = item.mod_mitad_dos.split("+").length - 1

                    let Adicionesm1 = item.mod_mitad_uno.replace(/Adicion /g, "").split("+")
                    let Adicionesm2 = item.mod_mitad_dos.replace(/Adicion /g, "").split("+")

                    //Mitad uno
                    for(let i = 1; i <= numAdicionesm1; i++) {
                        if(Adicionesm1[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesm1[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesm1[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesm1[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesm1[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesm1[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesm1[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesm1[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesm1[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesm1[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesm1[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesm1[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesm1[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesm1[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesm1[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesm1[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesm1[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesm1[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesm1[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                        //Mitad dos
                    for(let i = 1; i <= numAdicionesm2; i++){
                        if(Adicionesm2[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesm2[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesm2[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesm2[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesm2[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesm2[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesm2[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesm2[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesm2[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesm2[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesm2[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesm2[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesm2[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesm2[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesm2[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesm2[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesm2[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesm2[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesm2[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //PIZZA MEDIANA COMPLETA 
                if(item.tipo.includes("PIZZA GRANDE COMPLETA")){
                    if(cajasPizzaGrandes === 1){
                        result.CAJAS_PIZZA = result.CAJAS_PIZZA - 1
                    }
                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 180
                    result.MASAS_MEDIANAS = result.MASAS_MEDIANAS - 1
                    let dosIng = 150;
                    let tresIng = 100;
                    let queso = 180;
        
                    if(item.sabor_grande === "MIXTA"){   
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "HAWAIANA"){
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "HIGOSTOCINETA"){
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "POLLOCHAMPI"){
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "JAMONCHAMPI"){
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "SAMBA"){
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "PETETE"){
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "CAMPESINA"){
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "NAPOLITANA"){
                        result.QUESO = result.QUESO - queso * 2
                    }else if(item.sabor_grande === "MARGARITA"){
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - queso * 2
                    }else if(item.sabor_grande === "GOURMET"){
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "PADRISIMA"){
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 40
                        result.LECHUGA = result.LECHUGA - 40
                        result.TOMATE = result.TOMATE - 40
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "VEGETARIANA"){
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_grande === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - queso

                    }else if(item.sabor_grande.includes("Combinada 2 Ingredientes")){
                        result.MASAS_MEDIANAS = result.MASAS_MEDIANAS - 1 
                        result.QUESO = result.QUESO - queso

                        let ing01 = item.sabor_grande.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.sabor_grande.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.sabor_grande.includes("Combinada 3 Ingredientes")){
                        result.MASAS_MEDIANAS = result.MASAS_MEDIANAS - 1 
                        result.QUESO = result.QUESO - queso

                        let ing01 = item.sabor_grande.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.sabor_grande.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.sabor_grande.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 120
                    let numAdiciones = item.mod_sabor_grande.split("+").length - 1
                    let Adiciones = item.mod_sabor_grande.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //PIZZA MEDIANA MITAD
                if(item.tipo.includes("PIZZA GRANDE MITAD")){

                    if(cajasPizzaGrandes === 1){
                        result.CAJAS_PIZZA = result.CAJAS_PIZZA - 1
                    }

                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 180
                    result.MASAS_MEDIANAS = result.MASAS_MEDIANAS - 1
                    let dosIng = 75;
                    let tresIng = 50;
                    let quesoM = 90;

                    if(item.mitad_uno === "MIXTA"){
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "HAWAIANA"){
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "HIGOSTOCINETA"){
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "POLLOCHAMPI"){
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "JAMONCHAMPI"){
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "SAMBA"){
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "PETETE"){
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "CAMPESINA"){
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "NAPOLITANA"){
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_uno === "MARGARITA"){
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_uno === "GOURMET"){
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "PADRISIMA"){
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        result.LECHUGA = result.LECHUGA - 20
                        result.TOMATE = result.TOMATE - 20
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "VEGETARIANA"){
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_uno === "FESTIVAL"){

                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - quesoM

                    }else if(item.mitad_uno.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_uno.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.mitad_uno.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.mitad_uno.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_uno.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.mitad_uno.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.mitad_uno.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }
                
                    if(item.mitad_dos === "MIXTA"){
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "HAWAIANA"){
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "HIGOSTOCINETA"){
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "POLLOCHAMPI"){
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "JAMONCHAMPI"){
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "SAMBA"){
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "PETETE"){
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "CAMPESINA"){
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "NAPOLITANA"){
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_dos === "MARGARITA"){
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.mitad_dos === "GOURMET"){
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "PADRISIMA"){
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        result.LECHUGA = result.LECHUGA - 20
                        result.TOMATE = result.TOMATE - 20
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "VEGETARIANA"){
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.mitad_dos === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - quesoM

                    }else if(item.mitad_dos.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_dos.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.mitad_dos.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.mitad_dos.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.mitad_dos.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.mitad_dos.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.mitad_dos.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 60
                    let numAdicionesm1 = item.mod_mitad_uno.split("+").length - 1
                    let numAdicionesm2 = item.mod_mitad_dos.split("+").length - 1

                    let Adicionesm1 = item.mod_mitad_uno.replace(/Adicion /g, "").split("+")
                    let Adicionesm2 = item.mod_mitad_dos.replace(/Adicion /g, "").split("+")

                    //Mitad 01
                    for(let i = 1; i <= numAdicionesm1; i++){
                        if(Adicionesm1[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesm1[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesm1[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesm1[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesm1[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesm1[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesm1[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesm1[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesm1[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesm1[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesm1[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesm1[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesm1[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesm1[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesm1[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesm1[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesm1[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesm1[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesm1[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                    //Mitad 01
                    for(let i = 1; i <= numAdicionesm2; i++){
                        if(Adicionesm2[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesm2[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesm2[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesm2[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesm2[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesm2[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesm2[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesm2[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesm2[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesm2[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesm2[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesm2[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesm2[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesm2[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesm2[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesm2[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesm2[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesm2[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesm2[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //PIZZA MEDIANA CUARTOS
                if(item.tipo.includes("PIZZA GRANDE CUARTO")){

                    if(cajasPizzaGrandes === 1){
                        result.CAJAS_PIZZA = result.CAJAS_PIZZA - 1
                    }

                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 180
                    result.MASAS_MEDIANAS = result.MASAS_MEDIANAS - 1
                    let dosIng = 37.5;
                    let tresIng = 25;
                    let quesoM = 45;

                    if(item.cuarto_uno === "MIXTA"){
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "HAWAIANA"){
                            
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "HIGOSTOCINETA"){
                            
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "POLLOCHAMPI"){
                            
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "JAMONCHAMPI"){
                            
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "SAMBA"){
                            
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "PETETE"){
                            
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "CAMPESINA"){
                            
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "NAPOLITANA"){
                            
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_uno === "MARGARITA"){
                        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_uno === "GOURMET"){
                            
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "PADRISIMA"){
                            
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 10
                        result.LECHUGA = result.LECHUGA - 10
                        result.TOMATE = result.TOMATE - 10
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "VEGETARIANA"){
                            
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_uno === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - quesoM

                    }else if(item.cuarto_uno.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_uno.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.cuarto_uno.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.cuarto_uno.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_uno.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.cuarto_uno.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.cuarto_uno.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }
                
                    if(item.cuarto_dos === "MIXTA"){
                            
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "HAWAIANA"){
                            
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "HIGOSTOCINETA"){
                            
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "POLLOCHAMPI"){
                            
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "JAMONCHAMPI"){                      
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "SAMBA"){
                            
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "PETETE"){                      
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "CAMPESINA"){                      
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "NAPOLITANA"){                      
        
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_dos === "MARGARITA"){                      
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_dos === "GOURMET"){                      
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "PADRISIMA"){                      
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 10
                        result.LECHUGA = result.LECHUGA - 10
                        result.TOMATE = result.TOMATE - 10
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "VEGETARIANA"){                      
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_dos === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - quesoM

                    }else if(item.cuarto_dos.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_dos.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.cuarto_dos.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.cuarto_dos.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_dos.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.cuarto_dos.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.cuarto_dos.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    if(item.cuarto_tres === "MIXTA"){                     
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "HAWAIANA"){                      
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "HIGOSTOCINETA"){                      
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "POLLOCHAMPI"){                      
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "JAMONCHAMPI"){                      
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "SAMBA"){                      
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "PETETE"){                      
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "CAMPESINA"){                      
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "NAPOLITANA"){                     
        
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_tres === "MARGARITA"){                     
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_tres === "GOURMET"){                     
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "PADRISIMA"){                     
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 10
                        result.LECHUGA = result.LECHUGA - 10
                        result.TOMATE = result.TOMATE - 10
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "VEGETARIANA"){                     
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_tres === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - quesoM

                    }else if(item.cuarto_tres.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_tres.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.cuarto_tres.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.cuarto_tres.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_tres.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.cuarto_tres.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.cuarto_tres.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    if(item.cuarto_cuatro === "MIXTA"){                     
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "HAWAIANA"){                     
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "HIGOSTOCINETA"){                     
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "POLLOCHAMPI"){                      
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "JAMONCHAMPI"){                      
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "SAMBA"){                      
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "PETETE"){                      
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "CAMPESINA"){                      
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "NAPOLITANA"){                      
        
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_cuatro === "MARGARITA"){                      
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - quesoM * 2
                    }else if(item.cuarto_cuatro === "GOURMET"){                      
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "PADRISIMA"){                      
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 10
                        result.LECHUGA = result.LECHUGA - 10
                        result.TOMATE = result.TOMATE - 10
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "VEGETARIANA"){                
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - quesoM
                    }else if(item.cuarto_cuatro === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng   
                        result.QUESO = result.QUESO - quesoM

                    }else if(item.cuarto_cuatro.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_cuatro.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.cuarto_cuatro.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.cuarto_cuatro.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - quesoM

                        let ing01 = item.cuarto_cuatro.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.cuarto_cuatro.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.cuarto_cuatro.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdicionesc1 = item.mod_cuarto_uno.split("+").length - 1
                    let numAdicionesc2 = item.mod_cuarto_dos.split("+").length - 1
                    let numAdicionesc3 = item.mod_cuarto_tres.split("+").length - 1
                    let numAdicionesc4 = item.mod_cuarto_cuatro.split("+").length - 1

                    let Adicionesc1 = item.mod_cuarto_uno.replace(/Adicion /g, "").split("+")
                    let Adicionesc2 = item.mod_cuarto_dos.replace(/Adicion /g, "").split("+")
                    let Adicionesc3 = item.mod_cuarto_tres.replace(/Adicion /g, "").split("+")
                    let Adicionesc4 = item.mod_cuarto_cuatro.replace(/Adicion /g, "").split("+")

                    //Cuarto 01
                    for(let i = 1; i <= numAdicionesc1; i++){
                        if(Adicionesc1[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesc1[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesc1[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesc1[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesc1[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesc1[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesc1[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesc1[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesc1[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesc1[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesc1[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesc1[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesc1[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesc1[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesc1[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesc1[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesc1[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesc1[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesc1[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                    //Cuarto 02
                    for(let i = 1; i <= numAdicionesc2; i++){
                        if(Adicionesc2[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesc2[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesc2[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesc2[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesc2[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesc2[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesc2[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesc2[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesc2[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesc2[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesc2[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesc2[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesc2[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesc2[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesc2[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesc2[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesc2[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesc2[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesc2[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                    //Cuarto 03
                    for(let i = 1; i <= numAdicionesc3; i++){
                        if(Adicionesc3[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesc3[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesc3[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesc3[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesc3[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesc3[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesc3[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesc3[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesc3[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesc3[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesc3[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesc3[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesc3[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesc3[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesc3[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesc3[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesc3[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesc3[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesc3[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                    //Cuarto 04
                    for(let i = 1; i <= numAdicionesc4; i++){
                        if(Adicionesc4[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adicionesc4[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adicionesc4[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adicionesc4[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adicionesc4[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adicionesc4[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adicionesc4[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adicionesc4[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adicionesc4[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adicionesc4[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adicionesc4[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adicionesc4[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adicionesc4[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adicionesc4[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adicionesc4[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adicionesc4[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adicionesc4[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adicionesc4[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adicionesc4[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //PIZZA PANTALON
                if(item.tipo === "PIZZA PANTALON"){

                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_LONCHERA = result.CAJAS_LONCHERA - 1
                    }

                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 130
                    result.MASA_CRUDA = result.MASA_CRUDA - 150
                    let dosIng = 50;
                    let tresIng = 33.33;
                    let queso = 100;
        
                    if(item.sabor_pantalon === "MIXTA"){
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "HAWAIANA"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "HIGOSTOCINETA"){
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "POLLOCHAMPI"){
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "JAMONCHAMPI"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "SAMBA"){
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "PETETE"){
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "CAMPESINA"){
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "NAPOLITANA"){
        
                        result.QUESO = result.QUESO - queso * 2
                    }else if(item.sabor_pantalon === "MARGARITA"){
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso * 2
                    }else if(item.sabor_pantalon === "GOURMET"){
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "PADRISIMA"){
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        result.LECHUGA = result.LECHUGA - 20
                        result.TOMATE = result.TOMATE - 20
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "VEGETARIANA"){ 
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pantalon === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - queso

                    }else if(item.sabor_pantalon.includes("Combinada 2 Ingredientes")){
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso

                        let ing01 = item.sabor_pantalon.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.sabor_pantalon.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.sabor_pantalon.includes("Combinada 3 Ingredientes")){
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso

                        let ing01 = item.sabor_pantalon.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.sabor_pantalon.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.sabor_pantalon.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdiciones = item.mod_sabor_pantalon.split("+").length - 1
                    let Adiciones = item.mod_sabor_pantalon.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //PIZZA PANNECOOK
                if(item.tipo === "PIZZA PANCOOK"){

                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_LONCHERA = result.CAJAS_LONCHERA - 1
                    }

                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 130
                    result.PANNE_COOK = result.PANNE_COOK - 1

                    let dosIng = 50;
                    let tresIng = 33.33;
                    let queso = 100;
        
                    if(item.sabor_pancook === "MIXTA"){
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "HAWAIANA"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "HIGOSTOCINETA"){
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "POLLOCHAMPI"){
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "JAMONCHAMPI"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "SAMBA"){
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "PETETE"){
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "CAMPESINA"){
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "NAPOLITANA"){
        
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso * 2
                    }else if(item.sabor_pancook === "MARGARITA"){
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso * 2
                    }else if(item.sabor_pancook === "GOURMET"){
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "PADRISIMA"){
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        result.LECHUGA = result.LECHUGA - 20
                        result.TOMATE = result.TOMATE - 20
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "VEGETARIANA"){ 
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_pancook === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - queso

                    }else if(item.sabor_pancook.includes("Combinada 2 Ingredientes")){
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso

                        let ing01 = item.sabor_pancook.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.sabor_pancook.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.sabor_pancook.includes("Combinada 3 Ingredientes")){
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso

                        let ing01 = item.sabor_pancook.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.sabor_pancook.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.sabor_pancook.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdiciones = item.mod_sabor_pancook.split("+").length - 1
                    let Adiciones = item.mod_sabor_pancook.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //RAVIOLIS
                if(item.tipo.includes("RAVIOLI SALSA")){
                    
                    if(cajasPizzaPersonales === 1){
                        //Empaque raviolis en caso de ser domicilios
                    }

                    result.PAN_OREGANO = result.PAN_OREGANO - 2
                    result.QUESO_PARMESANO = result.QUESO_PARMESANO - 10

                    //Restamos al tipo de salsa
                    if(item.tipo.includes("NAPOLITANA")){
                        result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 200
                    }else if(item.tipo.includes("PESTO")){
                       
                    }else if(item.tipo.includes("ALFREDO")){
                        result.MANTEQUILLA = result.MANTEQUILLA - 30
                        result.LECHE = result.LECHE - 100
                        result.CREMA_LECHE = result.CREMA_LECHE - 100
                    }

                    //Dos tipos de raviolis
                    if(item.sabor_ravioli === "CARNE"){
                        result.RAVIOLIS_CARNE = result.RAVIOLIS_CARNE - 1
                    }else if(item.sabor_ravioli === "ESPINACA"){
                        result.RAVIOLIS_ESPINACA = result.RAVIOLIS_ESPINACA - 1
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdiciones = item.mod_sabor_ravioli.split("+").length - 1
                    let Adiciones = item.mod_sabor_ravioli.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                }

                //LASAGNA
                if(item.tipo.includes("LASAGNA SALSA")){

                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_PERSONALES = result.CAJAS_PERSONALES - 1
                        result.MOLDES_LASAGNIA = result.MOLDES_LASAGNIA - 1
                    }
                    
                    result.PASTA_LASAÑA_PORCION = result.PASTA_LASAÑA_PORCION - 2
                    result.PAN_OREGANO = result.PAN_OREGANO - 2

                    let dosIng = 75;
                    let tresIng = 50;
                    let queso = 100;

                    if(item.tipo.includes("NAPOLITANA")){
                        result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 180
                    }else if(item.tipo.includes("QUESO")){
                        result.CREMA_LECHE = result.CREMA_LECHE - 95
                    }
        
                    if(item.sabor_lasagna === "MIXTA"){
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "HAWAIANA"){
        
                        result.JAMON = result.JAMON - 100
                        result.PINIA_CALADA = result.PINIA_CALADA - 50
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "HIGOSTOCINETA"){
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "POLLOCHAMPI"){
        
                        result.POLLO = result.POLLO - 100
                        result.CHAMPINIONES = result.CHAMPINIONES - 50
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "JAMONCHAMPI"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "SAMBA"){
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - 50
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "PETETE"){
        
                        result.POLLO = result.POLLO - 100
                        result.TOCINETA = result.TOCINETA - 50
                        result.TOMATE = result.TOMATE - 0
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "CAMPESINA"){
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "NAPOLITANA"){
        
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso * 2
                    }else if(item.sabor_lasagna === "MARGARITA"){
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso * 2
                    }else if(item.sabor_lasagna === "GOURMET"){
        
                        result.POLLO = result.POLLO - 100
                        result.ACEITUNAS = result.ACEITUNAS - 25
                        result.TOMATES_SECOS = result.TOMATES_SECOS - 25
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "PADRISIMA"){
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        
                        result.TOMATE = result.TOMATE - 20
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "VEGETARIANA"){ 
        
                        result.ACEITUNAS = result.ACEITUNAS - 30
                        result.TOMATES_SECOS = result.TOMATES_SECOS - 30
                        result.CHAMPINIONES = result.CHAMPINIONES - 30
                        result.CEBOLLA = result.CEBOLLA - 30
                        result.PIMENTON = result.PIMENTON - 30
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng  
                        result.QUESO = result.QUESO - queso

                    }else if(item.sabor_lasagna === "BOLOGNESA"){ 
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - 150
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso
                    }else if(item.sabor_lasagna.includes("Combinada 2 Ingredientes")){
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso

                        let ing01 = item.sabor_lasagna.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.sabor_lasagna.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.sabor_lasagna.includes("Combinada 3 Ingredientes")){
                        result.QUESO_LASANIA = result.QUESO_LASANIA - queso

                        let ing01 = item.sabor_lasagna.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.sabor_lasagna.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.sabor_lasagna.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }
                    
                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdiciones = item.mod_sabor_lasagna.split("+").length - 1
                    let Adiciones = item.mod_sabor_lasagna.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO_LASANIA = result.QUESO_LASANIA - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }

                }

                //PASTA
                if(item.tipo.includes("PASTA TIPO")){
                    result.QUESO_PARMESANO = result.QUESO_PARMESANO - 10
                    result.PAN_OREGANO = result.PAN_OREGANO - 2

                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_PERSONALES = result.CAJAS_PERSONALES - 1
                        result.MOLDES_LASAGNIA = result.MOLDES_LASAGNIA - 1
                    }
                    
                    if(item.tipo.includes("SPAGHETTI")){
                        result.SPAGUETTYS_PORCION = result.SPAGUETTYS_PORCION - 1
                    }else{
                        result.FETUCHINNIS_PORCION = result.FETUCHINNIS_PORCION - 1
                    }

                    if(item.tipo.includes("NAPOLITANA")){
                        result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 240
                    }else if(item.tipo.includes("SALSA BLANCA") && item.sabor_pasta !== "CARBONARA"){
                        result.CREMA_LECHE = result.CREMA_LECHE - 95
                    }

                    let dosIng = 75;
                    let tresIng = 50;
                    let queso = 0;
        
                    if(item.sabor_pasta === "MIXTA"){
        
                        result.JAMON = result.JAMON - tresIng
                        result.CABANOS = result.CABANOS - tresIng
                        result.SALAMI = result.SALAMI - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "HAWAIANA"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "HIGOSTOCINETA"){
        
                        result.HIGOS = result.HIGOS - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "POLLOCHAMPI"){
        
                        result.POLLO = result.POLLO - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "JAMONCHAMPI"){
        
                        result.JAMON = result.JAMON - dosIng
                        result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "SAMBA"){
        
                        result.MADURO = result.MADURO - dosIng
                        result.TOCINETA = result.TOCINETA - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "PETETE"){
        
                        result.POLLO = result.POLLO - tresIng
                        result.TOCINETA = result.TOCINETA - tresIng
                        result.TOMATE = result.TOMATE - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "CAMPESINA"){
        
                        result.MAIZ = result.MAIZ - dosIng
                        result.CABANOS = result.CABANOS - dosIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "NAPOLITANA"){
        
                        result.QUESO = result.QUESO - queso * 2 + 75
                    }else if(item.sabor_pasta === "MARGARITA"){
        
                        result.TOMATE = result.TOMATE - dosIng
                        result.QUESO = result.QUESO - queso * 2 + 75
                    }else if(item.sabor_pasta === "GOURMET"){
        
                        result.POLLO = result.POLLO - tresIng
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "PADRISIMA"){
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng * 3
                        result.JALAPENIOS = result.JALAPENIOS - 20
                        result.LECHUGA = result.LECHUGA - 20
                        result.TOMATE = result.TOMATE - 20
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "VEGETARIANA"){ 
        
                        result.ACEITUNAS = result.ACEITUNAS - tresIng
                        result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        result.CEBOLLA = result.CEBOLLA - tresIng
                        result.PIMENTON = result.PIMENTON - tresIng
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "FESTIVAL"){
 
                        result.CHAMPINIONES = result.CHAMPINIONES - tresIng 
                        result.JAMON = result.JAMON - tresIng
                        result.SALAMI = result.SALAMI - tresIng   
                        result.QUESO = result.QUESO - queso

                    }else if(item.sabor_pasta === "BOLOGNESA"){ 
        
                        result.CARNE_MOLIDA = result.CARNE_MOLIDA - 150
                        result.QUESO = result.QUESO - queso
                    }else if(item.sabor_pasta === "CARBONARA"){ 
                        result.TOCINETA = result.TOCINETA - 100
                        result.HUEVOS = result.HUEVOS - 1
                        result.CREMA_LECHE = result.CREMA_LECHE - 95                    
                        
                    }else if(item.sabor_pasta.includes("Combinada 2 Ingredientes")){
                        result.QUESO = result.QUESO - queso

                        let ing01 = item.sabor_pasta.split("+", 3)[1].replace(" " ,"");
                        let ing02 = item.sabor_pasta.split("+", 3)[2].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - dosIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - dosIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - dosIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - dosIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - dosIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - dosIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - dosIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - dosIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - dosIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - dosIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - dosIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - dosIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - dosIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - dosIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - dosIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - dosIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - dosIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - dosIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - dosIng
                        }

                    }else if(item.sabor_pasta.includes("Combinada 3 Ingredientes")){
                        result.QUESO = result.QUESO - queso

                        let ing01 = item.sabor_pasta.split("+", 4)[1].replace(" " ,"");
                        let ing02 = item.sabor_pasta.split("+", 4)[2].replace(" " ,"");
                        let ing03 = item.sabor_pasta.split("+", 4)[3].replace(" " ,"");

                        if(ing01.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing01.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing01.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing01.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing01.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing01.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing01.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing01.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing01.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing01.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing01.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing01.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing01.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing01.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing01.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing01.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing01.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing01.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing01.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing02.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing02.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing02.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing02.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing02.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing02.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing02.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing02.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing02.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing02.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing02.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing02.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing02.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing02.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing02.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing02.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing02.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing02.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing02.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }

                        if(ing03.includes("Jamon")){                        
                            result.JAMON = result.JAMON - tresIng
                        }else if(ing03.includes("Pollo")){
                            result.POLLO = result.POLLO - tresIng
                        }else if(ing03.includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - tresIng
                        }else if(ing03.includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - tresIng
                        }else if(ing03.includes("Cabanos")){
                            result.CABANOS = result.CABANOS - tresIng
                        }else if(ing03.includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - tresIng
                        }else if(ing03.includes("Salami")){
                            result.SALAMI = result.SALAMI - tresIng
                        }else if(ing03.includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - tresIng
                        }else if(ing03.includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - tresIng
                        }else if(ing03.includes("Tomate")){
                            result.TOMATE = result.TOMATE - tresIng
                        }else if(ing03.includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - tresIng
                        }else if(ing03.includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - tresIng
                        }else if(ing03.includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - tresIng
                        }else if(ing03.includes("Maduro")){
                            result.MADURO = result.MADURO - tresIng
                        }else if(ing03.includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - tresIng
                        }else if(ing03.includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - tresIng
                        }else if(ing03.includes("Queso")){
                            result.QUESO = result.QUESO - tresIng
                        }else if(ing03.includes("Maiz")){
                            result.MAIZ = result.MAIZ - tresIng
                        }else if(ing03.includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - tresIng
                        }
                    }

                    //Ingrediente adicional
                    let adicionGramos = 30
                    let numAdiciones = item.mod_sabor_pasta.split("+").length - 1
                    let Adiciones = item.mod_sabor_pasta.replace(/Adicion /g, "").split("+")

                    for(let i = 1; i <= numAdiciones; i++){
                        if(Adiciones[i].includes("Jamon")){                        
                            result.JAMON = result.JAMON - adicionGramos
                        }else if(Adiciones[i].includes("Pollo")){
                            result.POLLO = result.POLLO - adicionGramos
                        }else if(Adiciones[i].includes("Champinones")){
                            result.CHAMPINIONES = result.CHAMPINIONES - adicionGramos
                        }else if(Adiciones[i].includes("CarneMolida")){
                            result.CARNE_MOLIDA = result.CARNE_MOLIDA - adicionGramos
                        }else if(Adiciones[i].includes("Cabanos")){
                            result.CABANOS = result.CABANOS - adicionGramos
                        }else if(Adiciones[i].includes("Lechuga")){
                            result.LECHUGA = result.LECHUGA - adicionGramos
                        }else if(Adiciones[i].includes("Salami")){
                            result.SALAMI = result.SALAMI - adicionGramos
                        }else if(Adiciones[i].includes("Tocineta")){
                            result.TOCINETA = result.TOCINETA - adicionGramos
                        }else if(Adiciones[i].includes("Cebolla")){
                            result.CEBOLLA = result.CEBOLLA - adicionGramos
                        }else if(Adiciones[i].includes("Tomate")){
                            result.TOMATE = result.TOMATE - adicionGramos
                        }else if(Adiciones[i].includes("Pimenton")){
                            result.PIMENTON = result.PIMENTON - adicionGramos
                        }else if(Adiciones[i].includes("Jalapeños")){
                            result.JALAPENIOS = result.JALAPENIOS - adicionGramos
                        }else if(Adiciones[i].includes("Aceitunas")){
                            result.ACEITUNAS = result.ACEITUNAS - adicionGramos
                        }else if(Adiciones[i].includes("Maduro")){
                            result.MADURO = result.MADURO - adicionGramos
                        }else if(Adiciones[i].includes("Peperoni")){
                            result.PEPERONI = result.PEPERONI - adicionGramos
                        }else if(Adiciones[i].includes("Pina")){
                            result.PINIA_CALADA = result.PINIA_CALADA - adicionGramos
                        }else if(Adiciones[i].includes("Queso")){
                            result.QUESO = result.QUESO - adicionGramos
                        }else if(Adiciones[i].includes("Maiz")){
                            result.MAIZ = result.MAIZ - adicionGramos
                        }else if(Adiciones[i].includes("TomatesSecos")){
                            result.TOMATES_SECOS = result.TOMATES_SECOS - adicionGramos
                        }
                    }
                }

                //PAN AJO         
                if(item.tipo.includes("PAN AJO")){
                    result.PANNE_COOK = result.PANNE_COOK - item.tipo.replace( /^\D+/g, '')             
                }

                if(item.tipo.includes("PIZZA FESTIVAL")){

                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')

                    if(cajasPizzaPersonales === 1){
                        result.CAJAS_PERSONALES = result.CAJAS_PERSONALES - 1
                    }

                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 60  
                    result.MASAS_PERSONALES = result.MASAS_PERSONALES - countAux   
                    result.CHAMPINIONES = result.CHAMPINIONES - 75  
                    result.JAMON = result.JAMON - 75
                    result.SALAMI = result.SALAMI - 75   
                    result.QUESO = result.QUESO - 75
                    
                }

                //PANADERIA            
                if(item.tipo.includes("PAN 10")){
                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.PAN_OREGANO = result.PAN_OREGANO - 10 * parseInt(countAux[1])
                }

                if(item.tipo.includes("PAN 20")){
                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.PAN_OREGANO = result.PAN_OREGANO - 20 * parseInt(countAux[1])            
                }

                if(item.tipo.includes("PAN COOK 2")){
                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.PANNE_COOK = result.PANNE_COOK - 2 * countAux[1]               
                }

                if(item.tipo.includes("PAN COOK UNIDAD")){
                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.PANNE_COOK = result.PANNE_COOK - 1 * countAux[1]               
                }

                if(item.tipo.includes("PAN UNIDAD")){
                    result.PAN_OREGANO = result.PAN_OREGANO - item.tipo.replace( /^\D+/g, '')              
                }

                if(item.tipo.includes("MASAS PER. 5")){
                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.MASAS_PERSONALES = result.MASAS_PERSONALES - 5 * countAux[1]       
                }

                if(item.tipo.includes("MASAS MEDIANAS UNI")){
                    let countAux = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.MASAS_MEDIANAS = result.MASAS_MEDIANAS - countAux               
                }

                //SOPA         
                if(item.tipo.includes("SOPA")){
                    if(item.sabor_sopa === "POLLO"){

                        result.PAN_OREGANO = result.PAN_OREGANO - 1
                        result.POLLO = result.POLLO - 20
                    }else if(item.sabor_sopa === "TOMATE"){
                        result.PAN_OREGANO = result.PAN_OREGANO - 1
                        result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - 130
                        result.CREMA_LECHE = result.CREMA_LECHE - 20
                    }else if(item.sabor_sopa === "CEBOLLA"){
                        result.PAN_OREGANO = result.PAN_OREGANO - 1
                        result.CEBOLLA = result.CEBOLLA - 50
                        result.MANTEQUILLA = result.MANTEQUILLA - 20
                        result.QUESO = result.QUESO -20
                    }else if(item.sabor_sopa === "VERDURAS"){
                        result.SOPA_VERDURAS = result.SOPA_VERDURAS - 1
                    }else if(item.sabor_sopa === "VERDURAS"){
                        result.SOPA_VERDURAS = result.SOPA_VERDURAS - 1
                    }
                }

                //CAFE         
                if(item.tipo.includes("CAFÉ")){
                    result.CAFE = result.CAFE - item.tipo.replace( /^\D+/g, '') * 50
                }

                //VINO         
                if(item.tipo.includes("VINO")){

                    /*
                    if(item.tipo.includes("VINO_TINTO")){
                        result.VINO_TINTO = result.VINO_TINTO - 150
                    }

                    if(item.tipo.includes("VINO_BLANCO")){
                        result.VINO_BLANCO = result.VINO_BLANCO - 150
                    }
                    */

                    if(item.tipo.includes("BOTELLA")){
                        result.VINO_TINTO = result.VINO_TINTO - item.tipo.replace( /^\D+/g, '') * 750  
                    }else{
                        result.VINO_TINTO = result.VINO_TINTO - item.tipo.replace( /^\D+/g, '') * 150
                    }   
                }

                //AROMATICAS
                if(item.tipo.includes("BEBIDA AROMATICA")){
                    let cantidad = item.tipo.split(' X ')
                    if(item.tipo.includes("FRUTOS ROJOS")){
                        result.AGUA_AROMATICA = result.AGUA_AROMATICA - cantidad[1]        
                    }else if(item.tipo.includes("MANSANILLA")){
                        result.AGUA_AROMATICA = result.AGUA_AROMATICA - cantidad[1]       
                    }else if(item.tipo.includes("YERBE BUENA")){
                        result.AGUA_AROMATICA = result.AGUA_AROMATICA - cantidad[1]       
                    }
                }

                //JUGOS
                if(item.tipo.includes("JUGO")){
                    
                    
                    if(item.tipo.includes("LIMONADA")){
                        if(item.tipo.includes("JARRA")){
                            if(item.mod_sabor_jugo.includes("Con Azucar")){
                                result.AZUCAR = result.AZUCAR - item.tipo.replace( /^\D+/g, '') * 120
                            }
                            result.LIMONES = result.LIMONES - item.tipo.replace( /^\D+/g, '') * 240
                        }else{
                            if(item.mod_sabor_jugo.includes("Con Azucar")){
                                result.AZUCAR = result.AZUCAR - item.tipo.replace( /^\D+/g, '') * 50
                            }
                            result.LIMONES = result.LIMONES - item.tipo.replace( /^\D+/g, '') * 120
                        }
                    }else{

                        if(item.mod_sabor_jugo.includes("Con Azucar")){
                            result.AZUCAR = result.AZUCAR - item.tipo.replace( /^\D+/g, '') * 50
                        }

                        result.JUGOS_NATURALES = result.JUGOS_NATURALES - item.tipo.replace( /^\D+/g, '')
                        if(item.tipo.includes("MANGO")){
                            result.JUGOS_NATURALES_MANGO = result.JUGOS_NATURALES_MANGO - item.tipo.replace( /^\D+/g, '')
                        }else if(item.tipo.includes("LULO")){
                            result.JUGOS_NATURALES_LULO = result.JUGOS_NATURALES_LULO - item.tipo.replace( /^\D+/g, '')
                        }else if(item.tipo.includes("LULADA")){
                            result.JUGOS_NATURALES_LULO = result.JUGOS_NATURALES_LULO - item.tipo.replace( /^\D+/g, '')
                        }else if(item.tipo.includes("MORA")){
                            result.JUGOS_NATURALES_MORA = result.JUGOS_NATURALES_MORA - item.tipo.replace( /^\D+/g, '')
                        }
                    }  
                }

                //CERVEZA        
                /*
                if(item.tipo.includes("CERVEZA")){
                    if(item.mod_sabor_cerveza === "Sin Michelar"){
                        result.CERVEZA = result.CERVEZA - item.tipo.replace( /^\D+/g, '')  
                    }else{
                        result.CERVEZA = result.CERVEZA - item.tipo.replace( /^\D+/g, '') 
                        result.LIMONES = result.LIMONES - item.tipo.replace( /^\D+/g, '') * 100
                    }                               
                }
                */
                if(item.tipo.includes("CLUB")){
                    if(item.mod_sabor_cerveza === "Sin Michelar"){
                        result.CERVEZA_CULB = result.CERVEZA_CULB - item.tipo.replace( /^\D+/g, '') 
                    }else{
                        result.CERVEZA_CULB = result.CERVEZA_CULB - item.tipo.replace( /^\D+/g, '') 
                        result.LIMONES = result.LIMONES - item.tipo.replace( /^\D+/g, '') * 100
                    }
                                
                }
                if(item.tipo.includes("POKER")){
                    if(item.mod_sabor_cerveza === "Sin Michelar"){
                        result.CERVEZA_POKER = result.CERVEZA_POKER - item.tipo.replace( /^\D+/g, '') 
                    }else{
                        result.CERVEZA_POKER = result.CERVEZA_POKER - item.tipo.replace( /^\D+/g, '') 
                        result.LIMONES = result.LIMONES - item.tipo.replace( /^\D+/g, '') * 100
                    }
                                
                }
                if(item.tipo.includes("AGUILA")){
                    if(item.mod_sabor_cerveza === "Sin Michelar"){
                        result.CERVEZA_AGUILA = result.CERVEZA_AGUILA - item.tipo.replace( /^\D+/g, '')  
                    }else{
                        result.CERVEZA_AGUILA = result.CERVEZA_AGUILA - item.tipo.replace( /^\D+/g, '')  
                        result.LIMONES = result.LIMONES - item.tipo.replace( /^\D+/g, '') * 100
                    }
                               
                }

                //GASEOSA        
                if(item.tipo.includes("GASEOSA")){

                    let glt4 = item.tipo.split("X", 2)
                    let g350 = item.tipo.split("X", 2)

                    if(item.tipo.includes("LITRO/4")){
                        result.COCA_COLA_L4 = result.COCA_COLA_L4 - glt4[1]  
                    }else if(item.tipo.includes("COLA ZERO")){
                            result.COCA_COLA_350_ZERO = result.COCA_COLA_350_ZERO - g350[1]
                    }else if(item.tipo.includes("COLA 350")){
                            result.COCA_COLA_350 = result.COCA_COLA_350 - g350[1]
                    }                               
                }

                //AGUA        
                if(item.tipo.includes("AGUA")){

                    if(item.tipo.includes("AGUA SIN GAS")){
                        result.AGUA_NORMAL = result.AGUA_NORMAL - item.tipo.replace( /^\D+/g, '')      
                    }else{
                        result.AGUA_GAS = result.AGUA_GAS - item.tipo.replace( /^\D+/g, '')      
                    }         
                }


                //SALSA 16 ONZAS        
                if(item.tipo.includes("SALSA 16 ONZAS")){
                    let cantidad = item.tipo.replace( /^\D+/g, '').split(' X ')
                    result.SALSA_NAPOLITANA_GALON = result.SALSA_NAPOLITANA_GALON - parseInt(cantidad[1]) * 472
                }
            })  

        })
        
    })

    //
    let insumosAUX = [result];
    let insumosFiltrados = filterArray(insumosAUX, insumos_tipo);

    return insumosFiltrados;
}

module.exports = resultVentasPeriodo;