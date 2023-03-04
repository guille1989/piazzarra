import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../App.css'

class inventarioCaliRefugio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventario: [],
            fechaHoy: '',
            hayFecha: false,
            modalEnviarInventario: false,
            showAdministradorAvisoinventario: false,
            fechaRegistroInventario: '',
            MASAS_PERSONALES: '',
            MASAS_MEDIANAS: '',
            PANNE_COOK: '',
            PAN_OREGANO: '',
            MASA_CRUDA: '',
            FETUCHINNIS_PORCION: '',
            SPAGUETTYS_PORCION: '',
            PASTA_LASAÑA_PORCION: '',
            JUGOS_NATURALES_MANGO: '',
            JUGOS_NATURALES_LULO: '',
            JUGOS_NATURALES_MORA: '',
            CERVEZA_CULB: '',
            CERVEZA_POKER: '',
            CERVEZA_AGUILA: '',
            COCA_COLA_350: '',
            COCA_COLA_350_ZERO: '',
            COCA_COLA_L4: '',
            AGUA_NORMAL: '',
            AGUA_GAS: '',
            VINO_TINTO: '',
            VINO_BLANCO: '',
            CAFE: '',
            QUESO: '',
            LIMONES: '',
            CABANOS: '',
            JAMON: '',
            SALAMI: '',
            TOCINETA: '',
            POLLO: '',
            CARNE_MOLIDA: '',
            PEPERONI: '',
            CHAMPINIONES: '',
            HIGOS: '',
            ACEITUNAS: '',
            PINIA_CALADA: '',
            TOMATES_SECOS: '',
            QUESO_PARMESANO: '',
            MAIZ: '',
            CEBOLLA: '',
            PIMENTON: '',
            AJO: '',
            LECHUGA: '',
            JALAPENIOS: '',
            MADURO: '',
            TOMATE: '',
            SALSA_NAPOLITANA_GALON: '',
            ACEITE_OLIVA: '',
            MANTEQUILLA: '',
            CREMA_LECHE: '',
            LECHE: '',
            HUEVOS: '',
            CAJAS_PERSONALES: '',
            CAJAS_PIZZA: '',
            CAJAS_LASAGNIA: '',
            MOLDES_LASAGNIA: '',            
            COSTO_MASAS_PERSONALES: '',
            COSTO_MASAS_MEDIANAS: '',
            COSTO_PANNE_COOK: '',
            COSTO_PAN_OREGANO: '',
            COSTO_MASA_CRUDA: '',
            COSTO_FETUCHINNIS_PORCION: '',
            COSTO_SPAGUETTYS_PORCION: '',
            COSTO_PASTA_LASAÑA_PORCION: '',
            COSTO_JUGOS_NATURALES_MANGO: '',
            COSTO_JUGOS_NATURALES_LULO: '',
            COSTO_JUGOS_NATURALES_MORA: '',
            COSTO_CERVEZA_CULB: '',
            COSTO_CERVEZA_POKER: '',
            COSTO_CERVEZA_AGUILA: '',
            COSTO_COCA_COLA_350: '',
            COSTO_COCA_COLA_350_ZERO: '',
            COSTO_COCA_COLA_L4: '',
            COSTO_AGUA_NORMAL: '',
            COSTO_AGUA_GAS: '',
            COSTO_VINO_TINTO: '',
            COSTO_VINO_BLANCO: '',
            COSTO_CAFE: '',
            COSTO_QUESO: '',
            COSTO_LIMONES: '',
            COSTO_CABANOS: '',
            COSTO_JAMON: '',
            COSTO_SALAMI: '',
            COSTO_TOCINETA: '',
            COSTO_POLLO: '',
            COSTO_CARNE_MOLIDA: '',
            COSTO_PEPERONI: '',
            COSTO_CHAMPINIONES: '',
            COSTO_HIGOS: '',
            COSTO_ACEITUNAS: '',
            COSTO_PINIA_CALADA: '',
            COSTO_TOMATES_SECOS: '',
            COSTO_QUESO_PARMESANO: '',
            COSTO_MAIZ: '',
            COSTO_CEBOLLA: '',
            COSTO_PIMENTON: '',
            COSTO_AJO: '',
            COSTO_LECHUGA: '',
            COSTO_JALAPENIOS: '',
            COSTO_MADURO: '',
            COSTO_TOMATE: '',
            COSTO_SALSA_NAPOLITANA_GALON: '',
            COSTO_ACEITE_OLIVA: '',
            COSTO_MANTEQUILLA: '',
            COSTO_CREMA_LECHE: '',
            COSTO_LECHE: '',
            COSTO_HUEVOS: '',
            COSTO_CAJAS_PERSONALES: '',
            COSTO_CAJAS_PIZZA: '',
            COSTO_CAJAS_LASAGNIA: '',
            COSTO_MOLDES_LASAGNIA: '',
            ENTRADA_MASAS_PERSONALES: '',
            ENTRADA_MASAS_MEDIANAS: '',
            ENTRADA_PANNE_COOK: '',
            ENTRADA_PAN_OREGANO: '',
            ENTRADA_MASA_CRUDA: '',
            ENTRADA_FETUCHINNIS_PORCION: '',
            ENTRADA_SPAGUETTYS_PORCION: '',
            ENTRADA_PASTA_LASAÑA_PORCION: '',
            ENTRADA_JUGOS_NATURALES_MANGO: '',
            ENTRADA_JUGOS_NATURALES_LULO: '',
            ENTRADA_JUGOS_NATURALES_MORA: '',
            ENTRADA_CERVEZA_CULB: '',
            ENTRADA_CERVEZA_POKER: '',
            ENTRADA_CERVEZA_AGUILA: '',
            ENTRADA_COCA_COLA_350: '',
            ENTRADA_COCA_COLA_350_ZERO: '',
            ENTRADA_COCA_COLA_L4: '',
            ENTRADA_AGUA_NORMAL: '',
            ENTRADA_AGUA_GAS: '',
            ENTRADA_VINO_TINTO: '',
            ENTRADA_VINO_BLANCO: '',
            ENTRADA_CAFE: '',
            ENTRADA_QUESO: '',
            ENTRADA_LIMONES: '',
            ENTRADA_CABANOS: '',
            ENTRADA_JAMON: '',
            ENTRADA_SALAMI: '',
            ENTRADA_TOCINETA: '',
            ENTRADA_POLLO: '',
            ENTRADA_CARNE_MOLIDA: '',
            ENTRADA_PEPERONI: '',
            ENTRADA_CHAMPINIONES: '',
            ENTRADA_HIGOS: '',
            ENTRADA_ACEITUNAS: '',
            ENTRADA_PINIA_CALADA: '',
            ENTRADA_TOMATES_SECOS: '',
            ENTRADA_QUESO_PARMESANO: '',
            ENTRADA_MAIZ: '',
            ENTRADA_CEBOLLA: '',
            ENTRADA_PIMENTON: '',
            ENTRADA_AJO: '',
            ENTRADA_LECHUGA: '',
            ENTRADA_JALAPENIOS: '',
            ENTRADA_MADURO: '',
            ENTRADA_TOMATE: '',
            ENTRADA_SALSA_NAPOLITANA_GALON: '',
            ENTRADA_ACEITE_OLIVA: '',
            ENTRADA_MANTEQUILLA: '',
            ENTRADA_CREMA_LECHE: '',
            ENTRADA_LECHE: '',
            ENTRADA_HUEVOS: '',
            ENTRADA_CAJAS_PERSONALES: '',
            ENTRADA_CAJAS_PIZZA: '',
            ENTRADA_CAJAS_LASAGNIA: '',
            ENTRADA_MOLDES_LASAGNIA: '', 

            INVENTARIO_FINAL_AUX: [],
            INVENTARIO_FINAL_ENTRADAS_AUX: [],
            INVENTARIO_FINAL_ENTRADAS_COSTO_AUX: []
        }
    }

    componentDidMount(){
        //Fecha
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("fechaHoyRInventario").value = today

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
        fetch('http://localhost:3001/api/insumos', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    inventario: data.inv
                })
            })
            .catch(err => console.log(err))


        fetch('http://localhost:3001/api/revisioninventariofecha/' + today, requestOptions)
        .then(response => response.json())
        .then(data => {
        if(data.inv.length === 0){
            //console.log("No hay")
            this.setState({
                showAdministradorAvisoinventario: false
            })
        }else{
            //console.log("Si hay")
            this.setState({
                showAdministradorAvisoinventario: true
            })
        }
        })
        .catch(err => console.log(err))

        //Fecha ->
        this.setState({
            fechaHoy: new Date().toLocaleDateString('en-US'),
            fechaRegistroInventario: today,
            hayFecha: true
        })
    }    

    salirInventarios(){
        this.props.logoutHandler()
    }

    handleFechaHoy(e){
        //Revisar primero si hay inventario ya con la fecha !
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
          fetch('http://localhost:3001/api/revisioninventariofecha/' + e.target.value, requestOptions)
              .then(response => response.json())
              .then(data => {
                if(data.inv.length === 0){
                    //console.log("No hay")
                    this.setState({
                        showAdministradorAvisoinventario: false
                    })
                }else{
                    //console.log("Si hay")
                    this.setState({
                        showAdministradorAvisoinventario: true
                    })
                }
              })
              .catch(err => console.log(err))

        this.setState({
            fechaRegistroInventario: e.target.value,
            hayFecha: true
        })
    }

    //Funciones para construir inventario final
    inventarioFinalGenerate(){
        let result = [];
        let resultAux = [];

        let itemAux = '';
        let cantidadAux = '';

        result = this.state.inventario.map((item, index) => {
            itemAux = item.TIPO;
            cantidadAux = this.state[item.TIPO]

            resultAux = {...resultAux, [itemAux]: cantidadAux}
        })

        result = resultAux

        this.setState({
            INVENTARIO_FINAL_AUX: result
        }) 
        
        return result
    }

    //Funcion para construir inventario entradas
    inventarioFinalEntradasGenerate(){
        let result = [];
        let resultAux = [];

        let itemAux = '';
        let cantidadAux = '';

        result = this.state.inventario.map((item, index) => {
            itemAux = 'ENTRADA_' + item.TIPO;
            cantidadAux = this.state['ENTRADA_' + item.TIPO]

            resultAux = {...resultAux, [itemAux]: cantidadAux}
        })

        result = resultAux

        this.setState({
            INVENTARIO_FINAL_ENTRADAS_AUX: result
        }) 
        
        return result
    }

    //Funcion para construir inventario entradas costos
    inventarioFinalEntradasCostoGenerate(){
        let result = [];
        let resultAux = [];

        let itemAux = '';
        let cantidadAux = '';

        result = this.state.inventario.map((item, index) => {
            itemAux = 'COSTO_' + item.TIPO;
            cantidadAux = this.state['COSTO_' + item.TIPO]

            resultAux = {...resultAux, [itemAux]: cantidadAux}
        })

        result = resultAux

        this.setState({
            INVENTARIO_FINAL_ENTRADAS_COSTO_AUX: result
        }) 
        
        return result
    }

    //Aqui guardamos los inventarios: Entrada, Costo y el inventario Final
    handleIngresarInventario(){

        if(window.confirm("Seguro desea enviar inventario ??")){
            //Construimos los bodys:
            let INVENTARIO_FINAL = this.inventarioFinalGenerate();
            let INVENTARIO_FINAL_ENTRADAS = this.inventarioFinalEntradasGenerate();
            let INVENTARIO_FINAL_ENTRADAS_COSTO = this.inventarioFinalEntradasCostoGenerate();

            this.setState({
                modalEnviarInventario: true
            })
            //***********************
            //***********************
            const requestOptions ={
                method: 'POST',
                headers : {'Content-type':'application/json'},
                body: JSON.stringify({
                    INVENTARIO_FINAL,
                    INVENTARIO_FINAL_ENTRADAS,
                    INVENTARIO_FINAL_ENTRADAS_COSTO
                })    
            }   
            //Envio inventario final   
            fetch('http://localhost:3001/api/inventarioactual/' + this.state.fechaRegistroInventario, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))

            //Envio inventario entradas
            fetch('http://localhost:3001/api/entradasinventario/' + this.state.fechaRegistroInventario, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))

            //Envio inventario entradas costos
            fetch('http://localhost:3001/api/insumocostos/' + this.state.fechaRegistroInventario, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))

            //Cerramos modal
            this.setState({
                modalEnviarInventario: false
            })

        }else{
            //Nada
        }
    }

    handleResumenInventarioActual(){

        //Traemos inventario final actual
        let result = [];
        let resultAux = [];

        let itemAux = '';
        let cantidadAux = '';

        result = this.state.inventario.map((item, index) => {
            itemAux = item.TIPO;
            cantidadAux = this.state[item.TIPO]

            resultAux = {...resultAux, [itemAux]: cantidadAux}
        })

        result = resultAux
        
        //       
        let inv_actual_aux = []
        let inv_actual_cant_aux = []

        for (let item in result) {
            //console.log(item, inv_actual[item]);
            if(result[item] === ''){
                
            }else{
                inv_actual_aux.push({TIPO: [item]})
                inv_actual_cant_aux.push({CANTIDAD: result[item]})
            }
          }
    
        return (   
            <>   
            <h3>Resumen Inventario Final</h3>
            <table className="table">                
                <tbody>
                    <tr>
                    <th scope="col" className="fs-2">Insumo</th>
                    <th scope="col" className="fs-2">Insumo Final</th>
                    </tr>

                    {inv_actual_aux.map((item, index) => {
                        return(
                            <>
                                <tr key={index}>
                                    <td>{item.TIPO}</td>
                                    <td>{inv_actual_cant_aux[index].CANTIDAD}</td>
                                </tr>                                
                            </>
                        )
                    })}

                </tbody>
            </table>
            </>
        )
    }

    handleResumenInventarioEntracas(){

        //Traemos inventario entradas
        let result_entradas = [];
        let resultAux_entradas = [];

        let itemAux_entrada = '';
        let cantidadAux_entrada = '';
        let cantidadAux_entrada_costo = '';

        result_entradas = this.state.inventario.map((item, index) => {
            itemAux_entrada = 'ENTRADA_' + item.TIPO;
            cantidadAux_entrada = this.state['ENTRADA_' + item.TIPO]
            cantidadAux_entrada_costo = this.state['COSTO_' + item.TIPO]

            resultAux_entradas = {...resultAux_entradas, [itemAux_entrada]: cantidadAux_entrada + '-' + cantidadAux_entrada_costo}
        })

        result_entradas = resultAux_entradas

        //       
        let inv_actual_aux = []
        let inv_actual_cant_aux = []
        let inv_actual_cant_aux_costo = []

        for (let item in result_entradas) {
            //console.log(item, inv_actual[item]);
            if(result_entradas[item] === '-'){
                
            }else{
                inv_actual_aux.push({TIPO: [item]})
                inv_actual_cant_aux.push({CANTIDAD: result_entradas[item].split("-")[0]})
                inv_actual_cant_aux_costo.push({COSTO: result_entradas[item].split("-")[1]})
            }
          }

        return (   
            <>   
            <h3>Resumen Inventario Entradas - Costos</h3>
            <table className="table">                
                <tbody>
                    <tr>
                    <th scope="col" className="fs-2">Insumo</th>
                    <th scope="col" className="fs-2">Insumo Entrada</th>
                    <th scope="col" className="fs-2">Costo Insumo Entrada</th>
                    </tr>

                    {inv_actual_aux.map((item, index) => {
                        return(
                            <>
                                <tr key={index}>
                                    <td>{item.TIPO}</td>
                                    <td>{inv_actual_cant_aux[index].CANTIDAD}</td>
                                    <td>{inv_actual_cant_aux_costo[index].COSTO}</td>
                                </tr>                                
                            </>
                        )
                    })}

                </tbody>
            </table>
            </>
        )
    }

    render() {
        return (
            <div className='contenedor'>     

                <br></br>
                <br></br>

                <h3>Paso No. 1: Seleccione fecha de cuadre de inventario: </h3>

                <br></br>
                <hr className="border border-3 opacity-100"></hr>

                <input 
                    type="date" 
                    id="fechaHoyRInventario"
                    onChange={this.handleFechaHoy.bind(this)}

                    className="form-control p-3 g-col-6" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-sm" 
                />

                <br></br>

                <p>
                    <strong>
                        Fecha cuadre de inventario (Año-Mes-Día):
                    </strong> 
                    {(() => {
                        if (this.state.hayFecha === true) {
                                                                return (
                                                                    <>                                                                        
                                                                        { this.state.showAdministradorAvisoinventario ? <h3 className="avisoFechaNoHay"> <strong>{this.state.fechaRegistroInventario}</strong> - Contacte al administrador ! el inventario ya se encuentra registrado !</h3> : <h2 className="avisoFechaSiHay"><strong>{this.state.fechaRegistroInventario}</strong></h2> }
                                                                    </>
                                                                )
                                                                } else {
                                                                return (
                                                                    <h2 className="avisoFechaNoHay"><strong>Por favor coloque una fecha de cuadre !!!</strong></h2>
                                                                )
                                                                }
                                                                })()
                                                            }
                </p>

                <br></br>

                <h3>Paso No. 2: Ingrese valores del inventario:</h3>
                <p>Por favor tener en cuenta: Los valores que se ingresan en el inventario son numericos, cifras unicas, sin punto o comas.</p>

                <br></br>
                <hr className="border border-3 opacity-100"></hr>

                <div>
                    <table className="table">                
                        <tbody>
                            <tr>
                            <th scope="col" className="fs-1">INSUMO</th>
                            <th scope="col" className="fs-2">Insumo Entrada</th>
                            <th scope="col" className="fs-2">Costo Entrada</th>
                            <th scope="col" className="fs-2">Insumo Final</th>
                            </tr>
                        
                        
                            {this.state.inventario.map((item, index) => {
                                return(
                                    <>                                    
                                        <tr key={index}>
                                            <td><strong>{item.TIPO}</strong></td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    id="inputEntrada"
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-sm" 
                                                    placeholder='Insumo Entrada'
                                                    onChange={(e) => this.setState({['ENTRADA_' + item.TIPO]: e.target.value}) }
                                                    />
                                            </td>
                                            <td>
                                                <input 
                                                        type="number" 
                                                        id="inputEntradaCosto"
                                                        className="form-control" 
                                                        aria-label="Sizing example input" 
                                                        aria-describedby="inputGroup-sizing-sm" 
                                                        placeholder='Costo Insumo Entrada'
                                                        onChange={(e) => this.setState({['COSTO_' + item.TIPO]: e.target.value}) }
                                                        />
                                            </td>
                                            <td>
                                                <input 
                                                        type="number" 
                                                        id="inputInventarioFinal"
                                                        className="form-control" 
                                                        aria-label="Sizing example input" 
                                                        aria-describedby="inputGroup-sizing-sm"   
                                                        placeholder='Insumo inventario final'                                             
                                                        onChange={(e) => this.setState({[item.TIPO]: e.target.value}) }
                                                        />
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>      
                </div>   
                <br></br>
             
                <button type="button" 
                        className="w-100 p-3 btn btn-success" 
                        onClick={() => {
                            if(this.state.showAdministradorAvisoinventario === true){
                                alert('No se puede agregar inventario !! ya se encuentra uno registrado !!')
                            }else{
                                if(this.state.fechaRegistroInventario === ''){
                                    alert('Por favor seleccione fecha de cuadre de inventario !!!!')
                                }else{                                
                                    let itemInventarioTieneNullValue = this.state.inventario.some((element, index) => {
                                        return this.state[element.TIPO] === ''
                                    })
                                    if(itemInventarioTieneNullValue === false){
                                        this.setState({modalEnviarInventario: true})
                                    }else{
                                        alert('Por favor diligenciar todos los campos del Insumo Final !!!!')
                                    }                                
                                }
                            }
                        }}
                        >Ingresar Inventario</button>          

                <br></br>
                <br></br>   

                {/*MODAL PARA EL RESUMEN DE INGRESO DE INVENTARIO:*/}
                <div>
                <Modal isOpen={this.state.modalEnviarInventario} fullscreen={true}>
                    <ModalHeader>Resumen antes de envio de Inventario</ModalHeader>
                    <ModalBody>
                        <> 
                            <br></br>
                            
                            <h1>Fecha de cuadre (Año-Mes-Día): {this.state.fechaRegistroInventario}</h1>
                            
                            <br></br>
                            <hr className="border border-3 opacity-100"></hr>

                            {this.handleResumenInventarioActual()}

                            <br></br>
                            <hr className="border border-3 opacity-100"></hr>

                            {this.handleResumenInventarioEntracas()}
                        </>
                    </ModalBody>
                    <ModalFooter>

                    <Button color="primary" onClick={this.handleIngresarInventario.bind(this)}>
                        Aceptar
                    </Button>

                    <Button color="danger" onClick={() => this.setState({modalEnviarInventario: false})}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                </div>  
   
            </div>
        );
    }
}

export default inventarioCaliRefugio;