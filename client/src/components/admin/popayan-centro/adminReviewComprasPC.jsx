import React, { Component } from 'react';

class adminReviewComprasPC extends Component {
    constructor(props) {
        super(props);
        this.state={
            data_entradas: [],
            data_entradas_costos: []
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

        const requestOptions = {
            method: 'GET',
            headers : new Headers({
                'Content-type':'application/json'
            }),    
        }      
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/compras/` + today + `/Pizzarra-Popayan-Centro`, requestOptions)
        .then(response => response.json())
        .then(data => {            
            if(data.inv_entrada === undefined){
                this.setState({
                    data_entradas: [],
                    data_entradas_costos: []
                })
            }else{
                this.setState({
                    data_entradas: data.inv_entrada.result_aux,
                    data_entradas_costos: data.inv_entrada.result_costos_aux
                })
            }    
        })
        .catch(err => console.log(err))
    }

    handleFechaHoy(e){
        //Revisar primero si hay inventario ya con la fecha !
        const requestOptions = {
            method: 'GET',
            headers : new Headers({
                'Content-type':'application/json'
            }),    
        }      
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/compras/` + e.target.value + `/Pizzarra-Popayan-Centro`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.inv_entrada === undefined){
                this.setState({
                    data_entradas: [],
                    data_entradas_costos: []
                })
            }else{
                this.setState({
                    data_entradas: data.inv_entrada.result_aux,
                    data_entradas_costos: data.inv_entrada.result_costos_aux
                })
            }            
        })
        .catch(err => console.log(err))
       
    }

    render() {
        return (
            <div className='contenedor'>
                <br></br>
                <br></br>

                <h1>Revision compras Popayan - Centro: </h1>

                <h3>Paso No. 1: Seleccione fecha</h3>

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

                <h1>Compras del dia: </h1>

                <table className="table">
                    <tbody>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                ITEM
                            </th>
                            <th>
                                CANTIDAD ENTRADA
                            </th>
                            <th>
                                COSTO ENTRADA
                            </th>                   
                        </tr>
                        {this.state.data_entradas.map((item, index) => {
                            return(
                                <tr>
                                    <th>
                                    </th>
                                    <th>
                                        {item.Item}
                                    </th>
                                    <th>
                                        {item.Cantidad}
                                    </th>                                    
                                        {(() => {                                                 
                                            let hayItem = this.state.data_entradas_costos.some((element, index) => {
                                                return element.Item === item.Item;
                                              });
                                            
                                            if(hayItem === true){
                                                let itemValueAux = this.state.data_entradas_costos.find((element, index) => {   
                                                    return item.Item === element.Item
                                                  });

                                                return(
                                                    <>
                                                    <th>{itemValueAux.Valor}</th>
                                                    </>
                                                )
                                            }else{
                                                return(
                                                    <>
                                                    <th>0</th>
                                                    </>
                                                )
                                            }                                            
                                        })()}                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default adminReviewComprasPC;