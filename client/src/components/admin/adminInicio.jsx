import React, { Component } from 'react';

class adminInicio extends Component {
    constructor(props) {
        super(props);
        this.state={
            inve_insumos: [],
            inve_final_data: [],
            inve_final_ayer_data: [],
            inve_final_compras_data: []
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
        var today_ayer = year + "-" + month + "-" + "0" + (date.getDate() -1);

        //---
        //---

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }     
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/insumos`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    inve_insumos: data.inv
                })
            })
        .catch(err => console.log(err)) 
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioactual/` + today + `/` + today_ayer, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    inve_final_data: data.inv.result,
                    inve_final_ayer_data: data.inv.result_ayer
                })
            })
        .catch(err => console.log(err))

        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioentradas/` + today, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    inve_final_compras_data: data.inv_entrada
                })
            })
        .catch(err => console.log(err))
    }

    handleFechaHoy(e){
        //Cuadramos ayer
        var date = new Date(e.target.value);
        var day = date.getDate();

        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today_ayer = year + "-" + month + "-" + day;

        //Revisar primero si hay inventario ya con la fecha !
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioactual/` + e.target.value + `/` + today_ayer, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    this.setState({
                        inve_final_data: data.inv.result,
                        inve_final_ayer_data: data.inv.result_ayer
                    })
                })
                .catch(err => console.log(err))

        
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioentradas/` + e.target.value, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                })
                .catch(err => console.log(err))
            
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioentradas/` + e.target.value, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    this.setState({
                        inve_final_compras_data: data.inv_entrada
                    })
            })

        this.setState({
            fechaRegistroInventario: e.target.value,
            hayFecha: true
        })
    }
    
    render() {
        return (
            <div className='contenedor'>     

                <br></br>
                <br></br>

                <h1>Cuadre inventario: </h1>

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

                <table className="table">                
                        <tbody>
                            <tr>
                            <th scope="col" className="fs-1">Insumo</th>
                            <th scope="col" className="fs-3">Inv. Inicial</th>
                            <th scope="col" className="fs-3">Entradas</th>
                            <th scope="col" className="fs-3">Salidas</th>
                            <th scope="col" className="fs-3">Inv. Final</th>
                            <th scope="col" className="fs-1">Cuadre Inv.</th>
                            </tr>
                            {this.state.inve_insumos.map((item, index) => {
                                return(
                                    <>
                                        <tr key={index}>
                                            <td><strong>{item.TIPO}</strong></td>
                                            <td>
                                            {(() => {
                                                if (this.state.inve_final_ayer_data[0]?.[item.TIPO] === undefined) {
                                                    return (
                                                        <>
                                                            0
                                                        </>                                      
                                                    )
                                                    } else {
                                                    return (                                
                                                        <>
                                                            {this.state.inve_final_ayer_data[0]?.[item.TIPO]}
                                                        </>
                                                    )
                                                    }
                                                    })()
                                                }
                                            </td>
                                            <td>
                                            {(() => {
                                                if (this.state.inve_final_compras_data[0]?.[item.TIPO] === undefined) {
                                                    return (
                                                        <>
                                                            0
                                                        </>                                      
                                                    )
                                                    } else {
                                                    return (                                
                                                        <>
                                                            {this.state.inve_final_compras_data[0]?.[item.TIPO]}
                                                        </>
                                                    )
                                                    }
                                                    })()
                                                }
                                            </td>
                                            <td></td>                                            
                                            <td>
                                            {(() => {
                                                if (this.state.inve_final_data[0]?.[item.TIPO] === undefined) {
                                                    return (
                                                        <>
                                                            0
                                                        </>                                      
                                                    )
                                                    } else {
                                                    return (                                
                                                        <>
                                                            {this.state.inve_final_data[0]?.[item.TIPO]}
                                                        </>
                                                    )
                                                    }
                                                    })()
                                                }
                                            </td>
                                            <td></td>
                                        </tr>
                                    </>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default adminInicio;