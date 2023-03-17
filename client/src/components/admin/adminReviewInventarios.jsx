import React, { Component } from 'react';

class adminInicio extends Component {
    constructor(props) {
        super(props);
        this.state={
            inve_insumos: [],
            inve_final_data: [],
            inve_final_ayer_data: [],
            inve_final_compras_data: [],
            inve_final_ventas: [],
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
                if(data.inv.result.length === 0 && data.inv.result_ayer.length !== 0){
                    this.setState({
                        inve_final_data: [],
                        inve_final_ayer_data: data.inv.result_ayer[0].INVENTARIO_AUX
                    })
                }else if(data.inv.result_ayer.length === 0 && data.inv.result.length !== 0){
                    this.setState({
                        inve_final_data: data.inv.result[0].INVENTARIO_AUX,
                        inve_final_ayer_data: []
                    })
                }else if(data.inv.result.length === 0 && data.inv.result_ayer.length === 0){
                    this.setState({
                        inve_final_data: [],
                        inve_final_ayer_data: []
                    })
                }else{
                    this.setState({
                        inve_final_data: data.inv.result[0].INVENTARIO_AUX,
                        inve_final_ayer_data: data.inv.result_ayer[0].INVENTARIO_AUX
                    })
                } 
            })
        .catch(err => console.log(err))

        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioentradas/` + today, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                if(data.error !== undefined){
                    this.setState({
                        inve_final_compras_data: []
                    })
                }else{
                    this.setState({
                        inve_final_compras_data: data.inv_entrada.result[0].INVENTARIO_AUX
                    })
                }
            })
        .catch(err => console.log(err))

        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/pedidossalidas/` + today, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    inve_final_ventas: data.inv
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
                    if(data.inv.result.length === 0 && data.inv.result_ayer.length !== 0){
                        this.setState({
                            inve_final_data: [],
                            inve_final_ayer_data: data.inv.result_ayer[0].INVENTARIO_AUX
                        })
                    }else if(data.inv.result_ayer.length === 0 && data.inv.result.length !== 0){
                        this.setState({
                            inve_final_data: data.inv.result[0].INVENTARIO_AUX,
                            inve_final_ayer_data: []
                        })
                    }else if(data.inv.result.length === 0 && data.inv.result_ayer.length === 0){
                        this.setState({
                            inve_final_data: [],
                            inve_final_ayer_data: []
                        })
                    }else{
                        this.setState({
                            inve_final_data: data.inv.result[0].INVENTARIO_AUX,
                            inve_final_ayer_data: data.inv.result_ayer[0].INVENTARIO_AUX
                        })
                    } 
                })
                .catch(err => console.log(err))       
            
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/inventarioentradas/` + e.target.value, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    if(data.error !== undefined){
                        this.setState({
                            inve_final_compras_data: []
                        })
                    }else{
                        this.setState({
                            inve_final_compras_data: data.inv_entrada.result[0].INVENTARIO_AUX
                        })
                    }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    inve_final_compras_data: []
                })
            })

            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/pedidossalidas/` + e.target.value, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    this.setState({
                        inve_final_ventas: data.inv
                    })
                })
            .catch(err => console.log(err))

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
                            <th scope="col" className="fs-3">Compras</th>
                            <th scope="col" className="fs-3">Ventas</th>
                            <th scope="col" className="fs-3">Inv. Final</th>
                            <th scope="col" className="fs-1">Cuadre Inv.</th>
                            </tr>
                            {this.state.inve_insumos.map((item, index) => {
                                return(
                                    <>
                                        <tr key={index}>
                                            <td><strong>{item.TIPO}</strong></td>
                                            <td> {/* INVENTARIO AYER !!!! */}
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
                                            <td> {/* COMPRAS !!!! */}
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
                                            <td> {/* VENTAS !!!! */}
                                            {(() => {
                                                if (this.state.inve_final_ventas?.[item.TIPO] === undefined) {
                                                    return (
                                                        <>
                                                            0
                                                        </>                                      
                                                    )
                                                    } else {
                                                    return (                                
                                                        <>
                                                            {this.state.inve_final_ventas?.[item.TIPO]}
                                                        </>
                                                    )
                                                    }
                                                    })()
                                                } 
                                            </td>                                            
                                            <td> {/* INVENTARIO FINAL !!!! */}
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
                                            <td> {/* AQUI SE HACE EL CUADRE DE INVENTARIO */}
                                                {(() => {
                                                        let invAyer_aux = (this.state.inve_final_ayer_data[0]?.[item.TIPO])
                                                        let invFinal_aux = (this.state.inve_final_data[0]?.[item.TIPO])
                                                        let invEntradas_aux = (this.state.inve_final_compras_data[0]?.[item.TIPO])
                                                        let invVetnas_aux = (this.state.inve_final_ventas?.[item.TIPO])

                                                        let cuadreInv_aux = 0                                                       

                                                        if(invAyer_aux === undefined || invAyer_aux === NaN){
                                                            invAyer_aux = 0
                                                        }

                                                        if(invFinal_aux === undefined || invFinal_aux === NaN){
                                                            invFinal_aux = 0
                                                        }

                                                        if(invEntradas_aux === undefined || invEntradas_aux === NaN){
                                                            invEntradas_aux = 0
                                                        }

                                                        if(invVetnas_aux === undefined || invVetnas_aux === NaN){
                                                            invVetnas_aux = 0
                                                        }

                                                        cuadreInv_aux = parseInt(invFinal_aux) - ( parseInt(invAyer_aux) + invEntradas_aux + parseInt(invVetnas_aux) ) 

                                                        return(
                                                            <>
                                                                { cuadreInv_aux }
                                                            </>
                                                        )
                                                    })()
                                                }
                                            </td>
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