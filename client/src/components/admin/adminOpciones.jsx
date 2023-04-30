import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class opciones extends Component {
    constructor(props) {
        super(props);
        this.state={
            insumosOpcion: [],
            modalInsumo: false,
            NuevoInsumo: ''
        }
    }

    componentDidMount(){
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/insumos`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    insumosOpcion: data.inv
                })
            })
            .catch(err => console.log(err))
    }

    handleNuevoI(){

        this.setState({
            modalInsumo: true
        })       
    }

    handleNuevoInsumo(){
        if(window.confirm("Seguro desea agregar nuevo Insumo: " + this.state.NuevoInsumo)){
            const requestOptions ={
                method: 'POST',
                headers : {'Content-type':'application/json'},
                body: JSON.stringify({NuevoInsumo: this.state.NuevoInsumo})    
            }   
            //Envio insumo   
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/insumos`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    this.setState({
                        modalInsumo: false
                    })
                })
                .catch(err => console.log(err))
                                    
        }else{

        } 
    }

    handleEliminarInsumo(id, insumo){
        if(window.confirm("Seguro desea eliminar insumo: " + insumo)){
            const requestOptions ={
                method: 'DELETE',
                headers : {'Content-type':'application/json'},  
            }   

            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/insumos/` + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    alert("Insumo Eliminado !")
                })
                .catch(err => console.log(err))
        }else{

        }
    }

    handleActualizarLimite(id, insumo){
        //console.log(insumo)
        //console.log(this.state[insumo])

        if(window.confirm("Seguro desea agregar/actualizar valor limite del insumo: " + insumo)){
            const requestOptions ={
                method: 'POST',
                headers : {'Content-type':'application/json'},
                body: JSON.stringify({INSUMO_LIMITE: this.state[insumo], TIPO: insumo})    
            }   
            //Envio insumo   
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizacionlimites`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    const requestOptions2 ={
                        method: 'GET',
                        headers : {'Content-type':'application/json'},   
                        }      
                    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/insumos`, requestOptions2)
                        .then(response => response.json())
                        .then(data => {
                            //console.log(data)
                            this.setState({
                                insumosOpcion: data.inv
                            })
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
                                    
        }else{

        } 
    }

    handleActualizarCosto(id, insumo){
        if(window.confirm("Seguro desea agregar/actualizar valor costo del insumo: " + insumo)){
            const requestOptions ={
                method: 'POST',
                headers : {'Content-type':'application/json'},
                body: JSON.stringify({INSUMO_COSTO: this.state[insumo], TIPO: insumo})    
            }   
            //Envio insumo   
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimienticostos`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    const requestOptions2 ={
                        method: 'GET',
                        headers : {'Content-type':'application/json'},   
                        }      
                    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/insumos`, requestOptions2)
                        .then(response => response.json())
                        .then(data => {
                            //console.log(data)
                            this.setState({
                                insumosOpcion: data.inv
                            })
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
                                    
        }else{

        } 
    }
    
    render() {
        return (
            <div className='contenedor'>

                <div className="accordion" id="accordionExample">                    

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            GESTION DE INSUMOS
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="row align-items-start">

                            <div className="col">
                            <h3>Lista de insumos cocina activos: # {this.state.insumosOpcion.length}</h3>
                            </div>    

                            <div className="col">
                            <input 
                                    id="insumoNuevo"
                                    type="text" 
                                    className="form-control" 
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-sm"   
                                    placeholder='Digite nuevo insumo'                                             
                                    onChange={(e) => this.setState({NuevoInsumo: e.target.value})}
                                    /> 
                            </div>    

                            <div className="col">
                                <button type="button" className="btn btn-success btn-lg" onClick={this.handleNuevoInsumo.bind(this)}>Agregar-Insumo</button>
                            </div>

                            </div>

                            <br></br>
                            <hr className="border border-3 opacity-100"></hr>

                            <table className="table">                
                                <tbody>
                                    <tr>
                                    <th scope="col" className="fs-3">No.</th>
                                    <th scope="col" className="fs-1">Insumo</th>
                                    <th scope="col" className="fs-3"></th>
                                    </tr>
                                    {this.state.insumosOpcion.map((item, index) => {
                                        return(
                                            <>
                                                <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><strong>{item.TIPO}</strong></td>
                                                            <td onClick={() => this.handleEliminarInsumo(item._id, item.TIPO)}>Eliminar</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>


                            <Modal isOpen={this.state.modalInsumo}>
                                <ModalHeader>Nuevo Insumo</ModalHeader>
                                <ModalBody>
                                    <input 
                                        id="limiteInsumo"
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-sm"   
                                        placeholder='Digite nuevo insumo'                                             
                                        onChange={(e) => this.setState({NuevoInsumo: e.target.value})}
                                        />                        
                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" onClick={this.handleNuevoInsumo.bind(this)}>
                                    Guardar
                                </Button>
                                <Button color="secondary" onClick={() => this.setState({modalInsumo: false})}>
                                    Cancel
                                </Button>
                                </ModalFooter>
                            </Modal>

                        </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            INSUMOS - LIMITES
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="row align-items-start">
                            <div className="col">
                            <h3>Insumos limites</h3>
                            </div>
                        </div>

                            <br></br>
                            <hr className="border border-3 opacity-100"></hr>

                            <table className="table">                
                                <tbody>
                                    <tr>
                                    <th scope="col" className="fs-3">No.</th>
                                    <th scope="col" className="fs-1">Insumo</th>
                                    <th scope="col" className="fs-1">Limite</th>
                                    <th scope="col" className="fs-1">Nuevo Limite</th>
                                    <th scope="col" className="fs-3"></th>
                                    </tr>
                                    {this.state.insumosOpcion.map((item, index) => {
                                        return(
                                            <>
                                                <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><strong>{item.TIPO}</strong></td>
                                                            <td><strong>{item.INSUMO_LIMITE}</strong></td>
                                                            <td>
                                                            <input 
                                                                type="number" 
                                                                id="inputEntrada"
                                                                className="form-control" 
                                                                aria-label="Sizing example input" 
                                                                aria-describedby="inputGroup-sizing-sm" 
                                                                placeholder='Insumo Entrada'
                                                                onChange={(e) => this.setState({[item.TIPO]: e.target.value})}
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
                                                            <td onClick={() => this.handleActualizarLimite(item._id, item.TIPO)}>Actualizar</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>


                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree-dos">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree-dos" aria-expanded="false" aria-controls="collapseThree-dos">
                            INSUMOS - COSTOS
                        </button>
                        </h2>
                        <div id="collapseThree-dos" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="row align-items-start">
                            <div className="col">
                            <h3>Insumos Costos por Gramo/Unidad</h3>
                            </div>
                        </div>

                            <br></br>
                            <hr className="border border-3 opacity-100"></hr>

                            <table className="table">                
                                <tbody>
                                    <tr>
                                    <th scope="col" className="fs-3">No.</th>
                                    <th scope="col" className="fs-1">Insumo</th>
                                    <th scope="col" className="fs-1">Costo</th>
                                    <th scope="col" className="fs-1">Nuevo Costo</th>
                                    <th scope="col" className="fs-3"></th>
                                    </tr>
                                    {this.state.insumosOpcion.map((item, index) => {
                                        return(
                                            <>
                                                <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><strong>{item.TIPO}</strong></td>
                                                            <td><strong>{item.INSUMO_COSTO}</strong></td>
                                                            <td>
                                                            <input 
                                                                type="number" 
                                                                id="inputEntrada"
                                                                className="form-control" 
                                                                aria-label="Sizing example input" 
                                                                aria-describedby="inputGroup-sizing-sm" 
                                                                placeholder='Insumo Entrada'
                                                                onChange={(e) => this.setState({[item.TIPO]: e.target.value})}
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
                                                            <td onClick={() => this.handleActualizarCosto(item._id, item.TIPO)}>Actualizar</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>

                </div>
            </div>      
        );
    }
}

export default opciones;