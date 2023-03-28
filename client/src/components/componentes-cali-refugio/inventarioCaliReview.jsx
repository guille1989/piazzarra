import React, { Component } from 'react';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort } from '@syncfusion/ej2-react-grids';

import FlagGreen from '../../images/flagGreen.png';
import FlagRed from '../../images/flagRed.png';

class inventarioCaliReview extends Component {
    constructor(props) {
        super(props);
        this.state={
            fecha_aux_01: '',
            inve_final: [],
            inve_entradas: [],
            inve_entradas_costos: [],
            inve_aux: [],
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
        var today_ayer = year + "-" + month + "-" + (date.getDate() -1);

        this.setState({
            fecha_aux_01: today
        })

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
          fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/leerinventarios/` + today + `/Pizzarra-Cali-Refugio`, requestOptions)
              .then(response => response.json())
              .then(data => {
                //console.log(data.inv)
                if(data.inv === undefined){
                    this.setState({
                        inve_aux: [],
                        inve_final: [],
                        inve_entradas: [],
                        inve_entradas_costos: []
                    })
                }else{
                    this.setState({
                        inve_aux: data.inv.resulta_aux,
                        inve_final: data.inv.result_inventario_tabla_resumen,
                        inve_entradas: data.inv.result_inventario_entrada_tabla_resumen,
                        inve_entradas_costos: data.inv.result_inventario_entrada_costos_tabla_resumen
                    })
                }
              })
              .catch(err => console.log(err))

            //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + today + `/` + today_ayer + `/Pizzarra-Cali-Refugio` + `/Cali-Refugio`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.inv.result_output)
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

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
          fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/leerinventarios/` + e.target.value + `/Pizzarra-Cali-Refugio` , requestOptions)
              .then(response => response.json())
              .then(data => {
                //console.log(data.inv)
                if(data.inv === undefined){
                    this.setState({
                        inve_aux: [],
                        inve_final: [],
                        inve_entradas: [],
                        inve_entradas_costos: []
                    })
                }else{
                    this.setState({
                        inve_aux: data.inv.resulta_aux,
                        inve_final: data.inv.result_inventario_tabla_resumen,
                        inve_entradas: data.inv.result_inventario_entrada_tabla_resumen,
                        inve_entradas_costos: data.inv.result_inventario_entrada_costos_tabla_resumen
                    })
                }
              })
              .catch(err => console.log(err))

        this.setState({
            fecha_aux_01: e.target.value
        })

        //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + e.target.value + `/` + today_ayer + `/Pizzarra-Cali-Refugio` + `/Cali-Refugio`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.inv.result_output)
                this.setState({
                    inve_cuadre: data.inv.result_output
                })
            })
        .catch(err => console.log(err))
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
            <div className="container-sm">  

                <br></br>
                <br></br>

                <h3>Seleccione fecha para la revision de inentario: </h3>

                <br></br>

                <input 
                    type="date" 
                    id="fechaHoyRInventario"

                    onChange={this.handleFechaHoy.bind(this)}

                    className="form-control p-3 g-col-6" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-sm" 
                />

                <br></br>

                <p>Inventario correspondiente a fecha: </p>

                {(() => {
                        //console.log(this.state.inve_aux.length)
                        if (this.state.inve_aux.length > 0) {
                            return (
                                <h2 className="avisoFechaSiHay"><strong> Inventario correspondiente a fecha: {this.state.fecha_aux_01}</strong></h2>                                                                                                            
                            )
                            } else {
                            return (                                
                                <h3 className="avisoFechaNoHay"> <strong>{this.state.fechaRegistroInventario}</strong> El inventario no se encuentra registrado !</h3>
                            )
                            }
                            })()
                        }

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
                            <Inject services={[Toolbar, Page, Sort]}/>
                        </GridComponent>
                    </div>
                </div>

            </div>
        );
    }
}

export default inventarioCaliReview;