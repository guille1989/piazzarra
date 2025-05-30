import React, { Component } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Freeze, Edit } from '@syncfusion/ej2-react-grids';
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
            fechaRegistroInventario: ''

        }
        this.toolbarOptions = ['Update', 'Cancel', 'Search'];
    }

    componentDidMount(){
        var date = new Date();
        var options = { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' };

        // Formatear la fecha de hoy
        var formatter = new Intl.DateTimeFormat('en-US', options);
        var [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(date);
        var today = `${year}-${month}-${day}`;

        // Establecer la fecha de hoy en el elemento con id "fechaHoyRInventario"
        document.getElementById("fechaHoyRInventario").value = today;

        // Obtener la fecha de ayer
        date.setDate(date.getDate() - 1);
        var [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(date);
        var today_ayer = `${year}-${month}-${day}`;

        //console.log(today);
        //console.log(today_ayer);

        this.setState({
            fechaRegistroInventario: today
        })

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }     

        //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + today + `/` + today_ayer + `/Pizzarra-Popayan-Centro` + `/Popayan-Centro`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.inv)
                this.setState({
                    inve_cuadre: data.inv.result_output
                })
            })
        .catch(err => console.log(err))
    }

    handleFechaHoy(e){
        //Cuadramos ayer
        // Cuadramos ayer
        const date = new Date(e.target.value);
        const options = { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(date);
        const today_ayer = `${year}-${month}-${day}`;

        //console.log(today_ayer)
        //console.log(e.target.value)

        //Revisar primero si hay inventario ya con la fecha !
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
        //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + e.target.value + `/` + today_ayer + `/Pizzarra-Popayan-Centro` + `/Popayan-Centro`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
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

    //
    editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };


    batchSave(e){
        //console.log(e.batchChanges.changedRecords[0].TIPO)

        //Inventario Compras
        //console.log('Fecha compras: ' + this.state.fechaRegistroInventario + ' :  ' + e.batchChanges.changedRecords[0].INV_ENTRADAS)

        //Inventario Final
        //console.log('Fecha Inventario Final: ' + this.state.fechaRegistroInventario + ' :  ' +e.batchChanges.changedRecords[0].INV_FINAL)

        const fetchOptions = {
            method: 'PUT',
            headers: {'Content-type':'application/json'},  
            body: JSON.stringify({'TIPO': e.batchChanges.changedRecords[0].TIPO, 'fecha': this.state.fechaRegistroInventario, 'invFinal': e.batchChanges.changedRecords[0].INV_FINAL, 'invCompras': e.batchChanges.changedRecords[0].INV_ENTRADAS, 'id': 'Pizzarra-Popayan-Centro'})
        }
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarinventarios`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
        })

        //Actualizar campos del inventario

        var date = new Date(this.state.fechaRegistroInventario);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        //document.getElementById("fechaHoyRInventario").value = this.state.fechaRegistroInventario

        var today_ayer = ""

        if (day < 10) {
            today_ayer = year + "-" + month + "-0" + (date.getDate());
        }else {
            today_ayer = year + "-" + month + "-" + (date.getDate());
        }
        

        //console.log(this.state.fechaRegistroInventario)
        //console.log(today)
        //console.log(today_ayer)

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }     

        //Inve cuadre completo
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/cuadre/` + this.state.fechaRegistroInventario + `/` + today_ayer + `/Pizzarra-Popayan-Centro` + `/Popayan-Centro`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.inv)
                this.setState({
                    inve_cuadre: data.inv.result_output
                })
            })
        .catch(err => console.log(err))

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
                            height={650} 
                            pageSettings={{ pageCount: 4, pageSizes: true }}     
                            editSettings={this.editSettings}     
                            beforeBatchSave={(e) =>this.batchSave(e)}             
                            >
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
                            <Inject services={[Freeze, Toolbar, Page, Sort, Edit]}/>
                        </GridComponent>
                    </div>
                </div>
            </div>
        );
    }
}

export default adminReviewInventarioPC;