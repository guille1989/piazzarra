import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
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
            //
            INVENTARIO_FINAL_AUX: [],
            INVENTARIO_FINAL_ENTRADAS_AUX: [],
            INVENTARIO_FINAL_ENTRADAS_COSTO_AUX: [],

            hideDialog: true
        }

        this.buttonRef = element => {
            this.buttonEle = element;
        };
        this.buttons = [{
                click: this.dlgButtonClick,
                buttonModel: {
                    content: 'Learn More',
                    isPrimary: true
                }
            }];
        this.animationSettings = { effect: 'None' };
    }

    buttonClick() {
        this.setState({ hideDialog: true });
    }
    dlgButtonClick() {
        window.open('https://www.syncfusion.com/company/about-us');
    }
    dialogClose() {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = "block";
    }
    dialogOpen() {
        this.buttonEle.style.display = "none";
    }

    //********

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
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/insumos`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.inv)
                this.setState({
                    inventario: data.inv
                })
            })
            .catch(err => console.log(err))


        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/revisioninventariofecha/` + today + `/Pizzarra-Cali-Refugio`, requestOptions)
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
          fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/revisioninventariofecha/` + e.target.value + `/Pizzarra-Cali-Refugio`, requestOptions)
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
            if(cantidadAux === undefined){
                resultAux = {...resultAux, [itemAux]: null}
            }else{
                resultAux = {...resultAux, [itemAux]: cantidadAux}
            }
        })

        //console.log(resultAux)

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

            if(cantidadAux === undefined){
                resultAux = {...resultAux, [itemAux]: null}
            }else{
                resultAux = {...resultAux, [itemAux]: cantidadAux}
            }
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
            let INVENTARIO_ID = 'Pizzarra-Cali-Refugio'

            this.setState({
                modalEnviarInventario: false
            })
            //***********************
            //***********************
            const requestOptions ={
                method: 'POST',
                headers : {'Content-type':'application/json'},
                body: JSON.stringify({
                    INVENTARIO_FINAL,
                    INVENTARIO_FINAL_ENTRADAS,
                    INVENTARIO_FINAL_ENTRADAS_COSTO,
                    INVENTARIO_ID
                })    
            }   
            //Envio inventario final   
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/inventarioactual/` + this.state.fechaRegistroInventario, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))

            //Envio inventario entradas
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/entradasinventario/` + this.state.fechaRegistroInventario, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))

            //Envio inventario entradas costos
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/insumocostos/` + this.state.fechaRegistroInventario, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))

            //Cerramos modal
            this.setState({
                modalEnviarInventario: false
            })

            window.location.reload();
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
            if(this.state['ENTRADA_' + item.TIPO] === undefined){
                cantidadAux_entrada = ''
            }else{
                cantidadAux_entrada = this.state['ENTRADA_' + item.TIPO]
            }
            if(this.state['COSTO_' + item.TIPO] === undefined){
                cantidadAux_entrada_costo = ''
            }else{
                cantidadAux_entrada_costo = this.state['COSTO_' + item.TIPO]
            }            

            resultAux_entradas = {...resultAux_entradas, [itemAux_entrada]: cantidadAux_entrada + '-' + cantidadAux_entrada_costo}
        })

        result_entradas = resultAux_entradas

        //       
        let inv_actual_aux = []
        let inv_actual_cant_aux = []
        let inv_actual_cant_aux_costo = []

        for (let item in result_entradas) {
            //console.log(result_entradas[item].split("-")[0].length);
            if(result_entradas[item] === '-'){
                
            }else{
                if(result_entradas[item].split("-")[0] === 'undefined' && result_entradas[item].split("-")[1] === 'undefined'){

                }else if(result_entradas[item].split("-")[0] === 'undefined'){
                    inv_actual_aux.push({TIPO: [item]})
                    inv_actual_cant_aux_costo.push({COSTO: result_entradas[item].split("-")[1]})
                }else if(result_entradas[item].split("-")[1] === 'undefined'){
                    inv_actual_aux.push({TIPO: [item]})
                    inv_actual_cant_aux.push({CANTIDAD: result_entradas[item].split("-")[0]})
                }else{
                    inv_actual_aux.push({TIPO: [item]})
                    inv_actual_cant_aux.push({CANTIDAD: result_entradas[item].split("-")[0]})
                    inv_actual_cant_aux_costo.push({COSTO: result_entradas[item].split("-")[1]})
                }
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

                <div className="table-responsive">
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
                                                    onWheel={(e) => {
                                                        // Prevent the input value change
                                                        e.target.blur()
                                                    
                                                        // Prevent the page/container scrolling
                                                        e.stopPropagation()
                                                    
                                                        // Refocus immediately, on the next tick (after the current function is done)
                                                          setTimeout(() => {
                                                            e.target.focus()
                                                        }, 0)
                                                    }}
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
                                                        onWheel={(e) => {
                                                            // Prevent the input value change
                                                            e.target.blur()
                                                        
                                                            // Prevent the page/container scrolling
                                                            e.stopPropagation()
                                                        
                                                            // Refocus immediately, on the next tick (after the current function is done)
                                                              setTimeout(() => {
                                                                e.target.focus()
                                                            }, 0)
                                                        }}
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
                                                        onWheel={(e) => {
                                                            // Prevent the input value change
                                                            e.target.blur()
                                                        
                                                            // Prevent the page/container scrolling
                                                            e.stopPropagation()
                                                        
                                                            // Refocus immediately, on the next tick (after the current function is done)
                                                              setTimeout(() => {
                                                                e.target.focus()
                                                            }, 0)
                                                        }}
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

                                        if(this.state[element.TIPO] === ''){
                                            return this.state[element.TIPO] === ''
                                        }else if(this.state[element.TIPO] === undefined){
                                            return this.state[element.TIPO] === undefined
                                        }else if(this.state[element.TIPO] === null){
                                            return this.state[element.TIPO] === null
                                        }
                                    })

                                    if(itemInventarioTieneNullValue === false){
                                        this.handleIngresarInventario()
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
              
                <Modal isOpen={this.state.modalEnviarInventario}>
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
        );
    }
}

export default inventarioCaliRefugio;