import React, { Component } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Freeze } from '@syncfusion/ej2-react-grids';
import FlagGreen from '../../../images/flagGreen.png';
import FlagRed from '../../../images/flagRed.png';

class adminReviewInventarioPC extends Component {
    constructor(props) {
        super(props);
        this.state={
            inve_cuadre: [],
            inve_insumos: [],
            inve_final_data: [],
            inve_final_ayer_data: [],
            inve_final_compras_data: [],
            inve_final_ventas: [],
        }
        this.toolbarOptions = ['Search'];
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
        var today_ayer = year + "-" + month + "-" + (date.getDate() -1);

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

        //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + today + `/` + today_ayer + `/Pizzarra-Popayan-Centro` + `/Popayan-Centro`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.inv.result_output)
                this.setState({
                    inve_cuadre: data.inv.result_output
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


        //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + e.target.value + `/` + today_ayer + `/Pizzarra-Popayan-Centro` + `/Popayan-Centro`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.inv.result_output)
                this.setState({
                    inve_cuadre: data.inv.result_output
                })
            })
        .catch(err => console.log(err))

        this.setState({
            fechaRegistroInventario: e.target.value,
            hayFecha: true
        })
    }

    statusTemplate(props) {
        if(props.INV_ESTADO === "Ok"){
            return(
                <div id="status" className="statustemp e-activecolor">
                <span className="statustxt e-activecolor">{props.INV_ESTADO}</span>
                </div>
            )
        }else if(props.INV_ESTADO === "Sobrante"){
            return (
                <div id="status" className="statustemp e-inactivecolor">
                <span className="statustxt e-inactivauxecolor">{props.INV_ESTADO}</span>
                </div>
            )
        }else{
            return (
                <div id="status" className="statustemp e-inactivecolor">
                <span className="statustxt e-inactivecolor">{props.INV_ESTADO}</span>
                </div>
            )
        }
       
    }

    trustTemplate(props) {
        let loc = { width: '31px', height: '24px' };
        let flagAux = ''
        if(props.ALARMA_INVENTARIO === 'Suficiente'){
            flagAux = FlagGreen;
        }else if(props.ALARMA_INVENTARIO === 'Insuficiente'){
            flagAux = FlagRed;
        }

        //let Trustworthiness = props.ALARMA_INVENTARIO == "Suficiente" ? 'src/images/flagGreen.png' : props.ALARMA_INVENTARIO == "Insufficient" ? 'src/images/flagRed.png' : 'src/grid/images/Perfect.png';
        return (<div> <img style={loc} src={flagAux}/>
      <span id="Trusttext">{props.ALARMA_INVENTARIO}</span></div>);
    }
    
    render() {
        return (
            <div className='contenedor'>     

                <br></br>
                <br></br>

                <h1>Cuadre inventario Popayan - Centro: </h1>

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

                <div className='control-pane'>
                    <div className='control-section'>
                        <GridComponent 
                            dataSource={this.state.inve_cuadre} 
                            toolbar={this.toolbarOptions} 
                            allowSorting={true} 
                            allowPaging={true} 
                            height={500} 
                            pageSettings={{ pageCount: 4, pageSizes: true }}>
                            <ColumnsDirective>
                                <ColumnDirective field='TIPO' headerText='Tipo-Insumo' width='200'></ColumnDirective>
                                <ColumnDirective field='INV_AYER' headerText='Inventario Inicial' width='130'></ColumnDirective>
                                <ColumnDirective field='INV_ENTRADAS' headerText='Entradas/Compras' width='130'/>
                                <ColumnDirective field='INV_VENTAS' headerText='Salidas/Ventas' width='130'/>
                                <ColumnDirective field='INV_FINAL' headerText='Inventario Final' width='130'></ColumnDirective>   
                                <ColumnDirective field='ALARMA_INVENTARIO' headerText='Alarma Cantidad Insumo' template={this.trustTemplate} width='130'></ColumnDirective>                             
                                <ColumnDirective field='INV_ESTADO' headerText='Estado Cuadre Insumo' template={this.statusTemplate} width='130'></ColumnDirective>
                                <ColumnDirective field='INV_CUADRE' headerText='Cuadre Inventario' width='130'></ColumnDirective>
                            </ColumnsDirective>
                            <Inject services={[Freeze, Toolbar, Page, Sort]}/>
                        </GridComponent>
                    </div>
                </div>
            </div>
        );
    }
}

export default adminReviewInventarioPC;