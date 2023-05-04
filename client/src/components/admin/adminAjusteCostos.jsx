import React, { Component } from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import '../../App.css'

class adminAjusteCostos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_sabores_pizza: [],
            costo_pizza_personal: '',
            costo_pizza_grande: '',
            costo_pizza_pantalon: '',
            costo_pizza_pancook: '',
            costo_lasagna_napolitana: '',
            costo_lasagna_queso: '',
            costo_spaguetti_napolitana: '',
            costo_spaguetti_queso: '',
            costo_fetuccini_napolitana: '',
            costo_fetuccini_queso: '',

            sabores_pizza_personal: [],
            sabores_pizza_grande: [],
            sabores_pizza_pantalon: [],
            sabores_pizza_pancook: [],
            sabores_lasagna_napolitana: [],
            sabores_lasagna_queso: [],
            sabores_spaguetti_napolitana: [],
            sabores_spaguetti_queso: [],
            sabores_fetuccini_napolitana: [],
            sabores_fetuccini_queso: []
        }
    }
    

    componentDidMount(){

        const fetchOptions = {
            method: 'GET',
            headers: {'Content-type':'application/json'},  
        }
        //Traemos Costos
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
                
                this.setState({
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,

                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux,
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux,
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
    }

    //
    handleCostoPizzaPersonal(item, e){
        //console.log(e.value)

        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
                .then(response => response.json())
                .then(data => {

                    const fetchOptions2 = {
                        method: 'GET',
                        headers: {'Content-type':'application/json'},  
                    }
                    
                    //Traemos Costos
                    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
                    .then(response => response.json())
                    .then(data => {
                        
                        this.setState({
                            costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                            costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                            costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                            costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                            costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                            costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                            costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                            costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                            costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                            costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
        
                            sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                            sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                            sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                            sabores_pizza_pancook: data.info.costoPizzaPacookAux,  
                            sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux,   
                            sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux, 
                            sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,      
                            sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,       
                            sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                            sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,   
                        })
                    })
                })
        
    }

    handleCostoPizzaGrande(item, e){
    //Hacemos el ajuste del precio
    const fetchOptions={
        method: 'PUT',
        headers: {'Content-type':'application/json'},  
        body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
    }
    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {

            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,

                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux,   
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,   
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,  
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
    }

    handleCostoPizzaPantalon(item, e){
    //Hacemos el ajuste del precio
    const fetchOptions={
        method: 'PUT',
        headers: {'Content-type':'application/json'},  
        body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
    }
    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
        .then(response => response.json())
        .then(data => {

        const fetchOptions2 = {
            method: 'GET',
            headers: {'Content-type':'application/json'},  
        }
        
        //Traemos Costos
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
        .then(response => response.json())
        .then(data => {
            
            this.setState({                    
                costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,

                sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux,  
                sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,   
                sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
            })
        })
    })
    }

    handleCostoPizzaPancook(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }



    handleCostoLasagnaNapolitana(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }


    handleCostoLasagnaQueso(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }

    handleCostoSpaguettiNapolitana(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }

    handleCostoSpaguettiQueso(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }

    handleCostoFetucciniNapolitana(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }

    handleCostoFetucciniQueso(item, e){
        //Hacemos el ajuste del precio
        const fetchOptions={
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': item, 'COSTO': e.value})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
    
            const fetchOptions2 = {
                method: 'GET',
                headers: {'Content-type':'application/json'},  
            }
            
            //Traemos Costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions2)
            .then(response => response.json())
            .then(data => {
                
                this.setState({                    
                    costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
                    costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
                    costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
                    costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
                    costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                    costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                    costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
                    costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                    costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
                    costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
    
                    sabores_pizza_personal: data.info.costoPizzaPersonalAux,
                    sabores_pizza_grande: data.info.costoPizzaGrandeAux,
                    sabores_pizza_pantalon: data.info.costoPizzaPantalonAux,
                    sabores_pizza_pancook: data.info.costoPizzaPacookAux, 
                    sabores_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux, 
                    sabores_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    sabores_spaguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    sabores_spaguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    sabores_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    sabores_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                })
            })
        })
        }

    render() {
        return (
            <>
                <br></br>
                <br></br>

                <h1>Ajuste Costos Pizzarra: </h1>
                
                <hr className="border border-3 opacity-100"></hr>

                <div className='ContenedorCostos'>
                
                <div className='CostosProductos'>               
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Pizza Personal: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_pizza_personal} change={(e) => this.handleCostoPizzaPersonal('PIZZA_PERSONAL_COMPLETA', e)}>
                            </NumericTextBoxComponent>
                        </div>
                        <div style={{marginTop:'15px', width: '200px'}}> 
                            <h4>Pizza Grande: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_pizza_grande} change={(e) => this.handleCostoPizzaGrande('PIZZA_GRANDE_COMPLETA', e)}>
                            </NumericTextBoxComponent>
                        </div>
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Pizza Pantalon: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_pizza_pantalon} change={(e) => this.handleCostoPizzaPantalon('PIZZA_PANTALON', e)}>
                            </NumericTextBoxComponent>
                        </div>
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Pizza Pancook: </h4> 
                            <NumericTextBoxComponent step={100} value={this.state.costo_pizza_pancook} change={(e) => this.handleCostoPizzaPancook('PIZZA_PANCOOK', e)}>
                            </NumericTextBoxComponent>
                        </div>

                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Lasagna Salsa Napolitana: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_lasagna_napolitana} change={(e) => this.handleCostoLasagnaNapolitana('PIZZA_LASAGNA_NAPOLITANA', e)}>
                            </NumericTextBoxComponent>
                        </div>
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Lasagna Salsa Queso: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_lasagna_queso} change={(e) => this.handleCostoLasagnaQueso('PIZZA_LASAGNA_QUESO', e)}>
                            </NumericTextBoxComponent>  
                        </div>
                    
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Spaguetti Napolitana: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_spaguetti_napolitana} change={(e) => this.handleCostoSpaguettiNapolitana('PIZZA_PASTA_SPAGUETTI_NAPOLITANA', e)}>
                            </NumericTextBoxComponent>
                        </div>
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Spaguetti Queso: </h4>  
                            <NumericTextBoxComponent step={100} value={this.state.costo_spaguetti_queso} change={(e) => this.handleCostoSpaguettiQueso('PIZZA_PASTA_SPAGUETTI_QUESO', e)}>
                            </NumericTextBoxComponent>  
                        </div>

                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Fetuccini Napolitana: </h4>
                            <NumericTextBoxComponent step={100} value={this.state.costo_fetuccini_napolitana} change={(e) => this.handleCostoFetucciniNapolitana('PIZZA_PASTA_FETUCCINI_NAPOLITANA', e)}>
                            </NumericTextBoxComponent>
                        </div>
                        <div style={{marginTop:'15px', width: '200px'}}>
                            <h4>Fetuccini Queso: </h4>   
                            <NumericTextBoxComponent step={100} value={this.state.costo_fetuccini_queso} change={(e) => this.handleCostoFetucciniQueso('PIZZA_PASTA_FETUCCINI_QUESO', e)}>
                            </NumericTextBoxComponent>
                        </div>                    
                </div>

                <div className="verticalline">
                </div>


                <div>
                
                <div className='saboresPizzaPersonal'>
                    {this.state.sabores_pizza_personal.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_pizza_grande.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_pizza_pantalon.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_pizza_pancook.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_lasagna_napolitana.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_lasagna_queso.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_spaguetti_napolitana.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_spaguetti_queso.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_fetuccini_napolitana.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                <div className='saboresPizzaGrande'>
                    {this.state.sabores_fetuccini_queso.map((item, index) => {
                        return(
                            <div style={{display: 'inline', marginRight: '20px', marginTop: '15px'}}>
                                <h4>{item.SABOR_PRODUCTO}</h4>
                                <h2>{item.PORCENTAJE_DE_INSUMOS}</h2>
                            </div>                            
                        )
                    })}
                </div>

                </div>

                </div>

            </>
        );
    }
}

export default adminAjusteCostos;