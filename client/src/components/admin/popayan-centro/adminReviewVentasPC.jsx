import React, { Component } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject  } from '@syncfusion/ej2-react-grids';

class adminReviewVentasPC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ventas: [],
            ventas_totales: [],
            ventas_review: []
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
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/pedidos/` + today + `/Popayan-Centro`, requestOptions)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            if(data.inv.result_sum_ventas === 0){
                console.log('No hay registro')
                this.setState({
                    ventas: [],
                    ventas_totales: [],
                    ventas_review: []
                })
            }else{
                //console.log(data)
                //console.log(data.inv.result_sum_ventas)
                this.setState({
                    ventas: data.inv.result,
                    ventas_totales: data.inv.result_sum_ventas,
                    ventas_review: data.inv.result_sum_tipo
                })
            }
        })
        .catch(err => console.log(err))
    }

    handleFechaHoy(e){
        //Revisar primero si hay inventario ya con la fecha !
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/pedidos/` + e.target.value + `/Popayan-Centro`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data.inv)
                    if(data.inv.result_sum_ventas === 0){
                        console.log('No hay registro')
                        this.setState({
                            ventas: [],
                            ventas_totales: [],
                            ventas_review: []
                        })
                    }else{
                        //console.log(data.inv.result[0].pedido)
                        //console.log(data.inv.result_sum_ventas)
                        //console.log(data)
                        this.setState({
                            ventas: data.inv.result,
                            ventas_totales: data.inv.result_sum_ventas,
                            ventas_review: data.inv.result_sum_tipo
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

                <h1>Revision ventas Popayan - Centro: </h1>

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

                <h1>Ventas del dia: {this.state.ventas_totales}</h1>

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
                                TIPO PEDIDO
                            </th>
                            <th>
                                SABORES
                            </th>
                            <th>
                                COSTO
                            </th>                   
                        </tr>
                        {this.state.ventas.map((item, index) => {
                            return(
                                <>
                                {item.pedido.map((item, index2) => {
                                    return(
                                        <>                                            
                                            <tr>
                                            <th scope="row">
                                            
                                            </th>
                                            <th>
                                                {item.tipo}
                                            </th>
                                            <th>                                                
                                                {this.state.ventas[index].aux[0].observacion_pedido ? ( <>{this.state.ventas[index].aux[0].tipo_pedido + ' - Cortesia'}</> ) : ( <>{this.state.ventas[index].aux[0].tipo_pedido}</> )}
                                            </th>
                                            {(() => {
                                                if (item.tipo === "PIZZA GRANDE COMPLETA") {
                                                return (
                                                    <>
                                                    <td>                                    
                                                        {item.sabor_grande} 
                                                        {item.mod_sabor_grande} 
                                                    </td>
                                                    <td>                                    
                                                        {item.costo_grande + item.costo_adiciones_grande} 
                                                    </td>
                                                    </>
                                                )
                                                } else if (item.tipo === "PIZZA PERSONAL COMPLETA") {
                                                return (
                                                    <>
                                                        <td>                                    
                                                            {item.sabor_personal} 
                                                            {item.mod_sabor_personal} 
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_personal + item.costo_adiciones} 
                                                        </td>
                                                    </>                                                
                                                )
                                                } else if (item.tipo === "PIZZA PERSONAL MITAD") {
                                                    return (
                                                        <>
                                                        <td>                                    
                                                            {item.mitad_uno} 
                                                            {item.mod_mitad_uno} <br></br>
                                                            {item.mitad_dos}
                                                            {item.mod_mitad_dos} <br></br>
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_personal + item.costo_adiciones} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo === "PIZZA GRANDE CUARTO") {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.cuarto_uno} 
                                                            {item.mod_cuarto_uno} <br></br>
                                                            {item.cuarto_dos} 
                                                            {item.mod_cuarto_dos} <br></br>
                                                            {item.cuarto_tres} 
                                                            {item.mod_cuarto_tres} <br></br>
                                                            {item.cuarto_cuatro}                            
                                                            {item.mod_cuarto_cuatro} 
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_grande + item.costo_adiciones_grande} 
                                                        </td>
                                                        </>
                                                    )
                                                } else if (item.tipo === "PIZZA GRANDE MITAD") {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.mitad_uno} 
                                                            {item.mod_mitad_uno} <br></br>
                                                            {item.mitad_dos} 
                                                            {item.mod_mitad_dos} <br></br>                                
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_grande + item.costo_adiciones_grande} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                } else if (item.tipo === "PIZZA PANTALON") {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.sabor_pantalon} 
                                                            {item.mod_sabor_pantalon}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_pantalon + item.costo_adiciones_pantalon} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                } else if (item.tipo === "PIZZA PANCOOK") {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.sabor_pancook} 
                                                            {item.mod_sabor_pancook}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_pancook + item.costo_adiciones_pancook} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("LASAGNA SALSA")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.sabor_lasagna} 
                                                            {item.mod_sabor_lasagna}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_lasagna + item.costo_adiciones_lasagna} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("PASTA")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.sabor_pasta} 
                                                            {item.mod_sabor_pasta}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_pasta + item.costo_adiciones_pasta} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo === "SOPA") {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.sabor_sopa} 
                                                            {item.mod_sabor_sopa}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_sopa + item.costo_adiciones_sopa} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("PAN AJO")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_pan_ajo} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("PAN 10")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_panaderia} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("PAN 20")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_panaderia} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("PAN COOK 2")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_panaderia} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("PAN UNIDAD")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_panaderia} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("AMERICANO")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.desayuno_tipo_bebida}  <br />        
                                                            {item.desayuno_tipo_huevos} 
                                                            {item.mod_sabor_desayuno}                             
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_desayuno_americano + item.costo_adiciones_americano} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("HUESPED")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.desayuno_tipo_bebida} <br />       
                                                            {item.desayuno_tipo_huevos}     
                                                            {item.mod_sabor_desayuno}                          
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_desayuno_huesped + item.costo_adiciones_huesped} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("MASAS")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                               
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_panaderia} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("CAFÉ")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo} 
                                                            {item.mod_sabor_cafe}                              
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_tinto} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("CHOCOLATE")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo} 
                                                            {item.mod_sabor_chocolate}                              
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_chocolate} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("VINO")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                             
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_vino} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("JUGO")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}    
                                                            {item.mod_sabor_jugo}                         
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_jugo} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("CERVEZA")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}    
                                                            {item.mod_sabor_cerveza}                         
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_cerveza} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("GASEOSA")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}    
                                                            {item.mod_sabor_gaseosa}                         
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_gaseosa} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("AGUA")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}    
                                                            {item.mod_sabor_bebida}                         
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_bebida} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("AROMATICA")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}    
                                                            {item.mod_sabor_bebida}                         
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_bebida} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                }else if (item.tipo.includes("SALSA 16 ONZAS")) {
                                                    return (
                                                        <>
                                                        <td>   
                                                            {item.tipo}                            
                                                        </td>
                                                        <td>                                    
                                                            {item.costo_otros} 
                                                        </td>
                                                        </>                                                    
                                                    )
                                                } else {
                                                    return (
                                                        <div>Sin datos</div>
                                                    )
                                                }
                                            })()}                      
                                            </tr>                                           
                                        </>
                                    )
                                })}
                            </>
                            )
                        })}
                    </tbody>
                </table>

                <br></br>

                <h1>Resumen Ventas:</h1>

                <br></br>

                <div className='control-pane'>
                <div className='control-section'>
                <GridComponent dataSource={this.state.ventas_review} height='350' allowSorting={true} >
                    <ColumnsDirective>
                    <ColumnDirective field='tipo_pedido' headerText='Tipo Pedido' width='120' textAlign='left'></ColumnDirective>
                    <ColumnDirective field='No' headerText='Numero' width='150'></ColumnDirective>                   
                    </ColumnsDirective>
                    <Inject services={[Sort]}/>
                </GridComponent>
                </div>
            </div> 

            </div>
        );
    }
}

export default adminReviewVentasPC;