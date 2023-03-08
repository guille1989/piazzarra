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
    
    render() {
        return (
            <div className='contenedor'>

                <br></br>

                <div class="row align-items-start">

                <div class="col">
                <h3>Lista de insumos cocina activos: # {this.state.insumosOpcion.length}</h3>
                </div>
                
                <div class="col">
                    <button type="button" class="btn btn-success btn-lg" onClick={this.handleNuevoI.bind(this)}>Agregar-Insumo</button>
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
        );
    }
}

export default opciones;