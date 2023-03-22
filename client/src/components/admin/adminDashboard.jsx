import React, { Component } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, Highlight, LineSeries } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';


class adminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro_seleccion: 'semana',
            filter_ventas: [],
            filet_limits: []
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

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/ventassemana/` + today + `/` + this.state.filtro_seleccion + `/Cali-Refugio`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data.inv)
                    this.setState({
                        filter_ventas: data.inv.result_aux,
                        filet_limits: data.inv.result_limite,
                    })
                })
                .catch(err => console.log(err))
    }

    handleFechaHoy(e){
        //Configuramos hoy
        var date = new Date(e.target.value);
        var day = date.getDate() + 1;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;

        //Mas 7 dias
        let dateAux = new Date(e.target.value);
        dateAux.setDate(dateAux.getDate() + 7);
        day = dateAux.getDate();
        month = dateAux.getMonth() + 1;
        year = dateAux.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var date_semana = year + "-" + month + "-" + day;

        //console.log('Semana del: ' + today + ' hasta ' + date_semana)

        //Fetch ventas por semana
        
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/ventassemana/` + e.target.value + `/` + this.state.filtro_seleccion + `/Cali-Refugio`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data.inv)
                    this.setState({
                        filter_ventas: data.inv.result_aux,
                        filet_limits: data.inv.result_limite,
                    })
                })
                .catch(err => console.log(err))
        }

    filtroChange(event){
        this.setState({
            filtro_seleccion: event.target.value
        })
        }
    
    render() {
        return (
            <div className='contenedor'>
                <br></br>
                <br></br>

                <h1>Grafica Ventas: </h1>
                
                <hr className="border border-3 opacity-100"></hr>

                <h3>Filtros: </h3>
                <h4>1. Tipo periodo: </h4>
                    <select className="form-select" aria-label="Default select example" onChange={this.filtroChange.bind(this)}>
                        <option selected>Seleccione tipo periodo</option>
                        <option value="semana">Semanal</option>
                        <option value="mes">Mensual</option>
                        <option value="semestre">Semestral</option>
                        <option value="anual">anual</option>
                    </select>
                <h4>2. Periodos: </h4>
                    <input 
                        type="date" 
                        id="fechaHoyRInventario"
                        onChange={this.handleFechaHoy.bind(this)}

                        className="form-control p-3 g-col-6 ls" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                    />


                {/* GRAFICA */}
                <br></br>

                <hr className="border border-3 opacity-100"></hr>

                <h3>Ventas {this.state.filtro_seleccion}</h3>

                <br></br>

                <div className='control-pane'>
                <div className='control-section'>
                    <ChartComponent id='charts' 
                    style={{ textAlign: "center" }}    
                    legendSettings={{ enableHighlight :true }} 
                    primaryXAxis={{ 
                        valueType: 'Category', 
                        interval: 1, 
                        majorGridLines: { width: 0 }, 
                        majorTickLines : {width:0} 
                    }}  
                    primaryYAxis={{ 
                        title: 'Ventas', 
                        majorTickLines: { width: 0 },
                        lineStyle: {width: 0}, 
                        maximum : 1500000 , 
                        interval: 150000,
                        labelFormat: '${value}'
                    }} 
                    useGroupingSeparator={true}
                    chartArea={{ border: { width: 0 } }} 
                    load={this.load.bind(this)} 
                    tooltip={{ enable: true }} 
                    width={Browser.isDevice ? '100%' : '100%'}                     
                    loaded={this.onChartLoad.bind(this)}>

                        <Inject services={[ColumnSeries, LineSeries, Legend, Tooltip, Category, DataLabel, Highlight]} />
                        <SeriesCollectionDirective >
                            <SeriesDirective dataSource={this.state.filter_ventas} tooltipMappingName='r' xName='Fecha' columnSpacing={0.1} yName='Dato' name='Ventas periodo' type='Column' marker={{
                                dataLabel: {
                                    visible: true,
                                    position: 'Middle',
                                    font: { fontWeight: '2W00', color: '#000000' },
                                },
                            }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={this.state.filter_ventas} xName="Fecha" yName="Limite" name="Target Ventas" width={2} marker={{ visible: true, width: 6, height: 6, shape: 'Triangle', isFilled: true }} type="Line">
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                </div>
            </div>
        );
    }

    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }

    load(){

    }
}

export default adminDashboard;