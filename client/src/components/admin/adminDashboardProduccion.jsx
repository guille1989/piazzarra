import React, { Component, ReactElement } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, Highlight, LineSeries, TrendlineDirective, TrendlinesDirective, Trendlines } from '@syncfusion/ej2-react-charts';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import {
    DashboardLayoutComponent,
    PanelsDirective,
    PanelDirective,
  } from '@syncfusion/ej2-react-layouts';
import {
ButtonComponent,
CheckBoxComponent,
FabComponent,
ChipDirective, ChipListComponent, ChipsDirective
} from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Browser } from '@syncfusion/ej2-base';


class adminDashboardProduccion extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            filtro_seleccion: 'semana',
            filter_ventas: [],
            filter_ventas_popayan: [],
            filet_limits: [],
            filter_ventas_tipo: [],
            filter_ventas_tipo_popayan: [],
            ventas_promedio_cali: '',
            ventas_promedio_popayan: '',
            ventas_totales_cali: '',
            ventas_totales_popayan: '',
            filter_prudccion_tipo: [],
        }
    }

    componentDidMount(){
        //Fecha
        var date = new Date();
        var day = date.getDate() - 7;
        if(day <= 0){
            day = date.getDate() - 6;
            if(day <= 0){
                day = date.getDate() - 5;
                if(day <= 0){
                    day = date.getDate() - 4;
                    if(day <= 0){
                        day = date.getDate() - 3;
                        if(day <= 0){
                            day = date.getDate() - 2;
                            if(day <= 0){
                                day = date.getDate() -1;
                                if(day <= 0){
                                    day = date.getDate()
                                }
                            }
                        }
                    }
                }
            }
        }
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
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/graficaproduccion/` + today + `/` + this.state.filtro_seleccion + `/Cali-Refugio`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data.inv)
                    this.setState({
                        filter_prudccion_tipo: data.inv.resutl_produccion_aux
                    })

                    //Popayan
                    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/graficaproduccion/` + today + `/` + this.state.filtro_seleccion + `/Popayan-Centro`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            //console.log(data.inv)
                            this.setState({
                                filter_prudccion_tipo: data.inv.resutl_produccion_aux
                            })
                        })
                        .catch(err => console.log(err))
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
        //var today = year + "-" + month + "-" + day;

        //Mas 7 dias
        let dateAux = new Date(e.target.value);
        dateAux.setDate(dateAux.getDate() + 7);
        day = dateAux.getDate();
        month = dateAux.getMonth() + 1;
        year = dateAux.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        //var date_semana = year + "-" + month + "-" + day;

        //console.log('Semana del: ' + today + ' hasta ' + date_semana)

        //Fetch ventas por semana
        
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
            fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/graficaproduccion/` + e.target.value + `/` + this.state.filtro_seleccion + `/Cali-Refugio`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    //console.log(data.inv)
                    this.setState({
                        filter_prudccion_tipo: data.inv.resutl_produccion_aux
                    })

                    //Para popayan
                    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/graficaproduccion/` + e.target.value + `/` + this.state.filtro_seleccion + `/Popayan-Centro`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            //console.log(data.inv)
                            this.setState({
                                filter_prudccion_tipo: data.inv.resutl_produccion_aux
                            })
                        })
                        .catch(err => console.log(err))
                        })
                .catch(err => console.log(err))
        }

    filtroChange(event){
        this.setState({
            filtro_seleccion: event.target.value
        })
        }

    pieUno(){
        return (
            <div style={{ height: "100%", width: "100%" }}>
                    <AccumulationChartComponent 
                        id="pie-chart" 
                        title='Tipo pedidos Pizzarra' 
                        enableSmartLabels={true} 
                        load={this.loadPie.bind(this)} 
                        tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>' }} 
                        loaded={this.onChartLoadPie.bind(this)} 
                        enableBorderOnMouseMove={false} 
                        legendSettings={{ visible: false }}>
                            <Inject services={[PieSeries, AccumulationDataLabel]}/>
                            <AccumulationSeriesCollectionDirective>
                                <AccumulationSeriesDirective 
                                    dataSource={this.state.filter_prudccion_tipo} 
                                    xName='x' 
                                    yName='y' 
                                    innerRadius='40%' 
                                    startAngle={0} 
                                    endAngle={360} 
                                    radius='75%' 
                                    explode={true} 
                                    explodeOffset='10%' 
                                    explodeIndex={0} 
                                    dataLabel={{
                                        visible: true,
                                        position: 'Outside', name: 'text',
                                        font: {
                                            fontWeight: '600',
                                        }
                                    }}>
                                </AccumulationSeriesDirective>
                            </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
        );
    }

    pieDos(){
        return(
            <div style={{ height: "100%", width: "100%" }}>
                    <AccumulationChartComponent 
                        id="pie-chart02" 
                        title='Tipo pedidos Pizzarra Popayan' 
                        enableSmartLabels={true} 
                        load={this.loadPie2.bind(this)} 
                        tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>' }} 
                        loaded={this.onChartLoadPie2.bind(this)} 
                        enableBorderOnMouseMove={false} 
                        legendSettings={{ visible: false }}>
                            <Inject services={[PieSeries, AccumulationDataLabel]}/>
                            <AccumulationSeriesCollectionDirective>
                                <AccumulationSeriesDirective 
                                    dataSource={this.state.filter_ventas_tipo_popayan} 
                                    xName='x' 
                                    yName='y' 
                                    innerRadius='40%' 
                                    startAngle={0} 
                                    endAngle={360} 
                                    radius='75%' 
                                    explode={true} 
                                    explodeOffset='10%' 
                                    explodeIndex={0} 
                                    dataLabel={{
                                        visible: true,
                                        position: 'Outside', name: 'text',
                                        font: {
                                            fontWeight: '600',
                                        }
                                    }}>
                                </AccumulationSeriesDirective>
                            </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
        );
    }

    graficaVentas(){
        return(
            <div style={{ height: "100%", width: "100%" }}>
                    <br></br>
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

                        <Inject services={[ColumnSeries, LineSeries, Legend, Tooltip, Category, DataLabel, Highlight, Trendlines]} />
                        <SeriesCollectionDirective >
                            <SeriesDirective 
                                dataSource={this.state.filter_ventas} 
                                tooltipMappingName='r' 
                                xName='Fecha' 
                                columnSpacing={0.1} 
                                yName='Dato' 
                                name='Ventas Cali' 
                                type='Column' 
                                marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: 'Middle',
                                        font: { fontWeight: '2W00', color: '#000000' },
                                    },
                                }}>

                                    <TrendlinesDirective>
                                        <TrendlineDirective 
                                            type='Linear' 
                                            width={3} 
                                            marker={{ visible: false }} 
                                            name='Trends' 
                                            fill='#C64A75'>
                                        </TrendlineDirective>
                                    </TrendlinesDirective>

                            </SeriesDirective>

                            <SeriesDirective 
                                dataSource={this.state.filter_ventas_popayan} 
                                tooltipMappingName='r' 
                                xName='Fecha' 
                                columnSpacing={0.1} 
                                yName='Dato' 
                                name='Ventas Popayan' 
                                type='Column' 
                                marker={{
                                    dataLabel: {
                                        visible: true,
                                        position: 'Middle',
                                        font: { fontWeight: '2W00', color: '#000000' },
                                    },
                                }}>
                            </SeriesDirective>

                            <SeriesDirective 
                                dataSource={this.state.filter_ventas} 
                                xName="Fecha" 
                                yName="Limite" 
                                name="Target Ventas" 
                                width={2} 
                                marker={{ visible: true, width: 6, height: 6, shape: 'Triangle', isFilled: true }} 
                                type="Line">
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
        );
    }

    ventasReview(){
        return(
            <div className='cuadroventas'>                
                    
                <h3 className='letrasencuadro'>Ventas Total Periodo Cali - Refugio: </h3> 

                <ButtonComponent cssClass='e-info'>{parseInt(this.state.ventas_totales_cali).toLocaleString('en-US', {
                                                                                        style: 'currency',
                                                                                        currency: 'USD',
                                                                                        minimumFractionDigits: 0,
                                                                                        maximumFractionDigits: 0,
                                                                                        })}</ButtonComponent>
        

                <h3>Ventas Promedio Periodo Cali - Refugio: </h3> 

                <ButtonComponent cssClass='e-info'>{parseInt(this.state.ventas_promedio_cali).toLocaleString('en-US', {
                                                                                        style: 'currency',
                                                                                        currency: 'USD',
                                                                                        minimumFractionDigits: 0,
                                                                                        maximumFractionDigits: 0,
                                                                                        })}</ButtonComponent>

                <h3>Ventas Total Periodo Popayan - Centro: </h3> 

                <ButtonComponent cssClass='e-info'>{parseInt(this.state.ventas_totales_popayan).toLocaleString('en-US', {
                                                                                        style: 'currency',
                                                                                        currency: 'USD',
                                                                                        minimumFractionDigits: 0,
                                                                                        maximumFractionDigits: 0,
                                                                                        })}</ButtonComponent>

                <h3>Ventas Promedio Periodo Popayan - Centro: </h3> 

                <ButtonComponent cssClass='e-info'>{parseInt(this.state.ventas_promedio_popayan).toLocaleString('en-US', {
                                                                                            style: 'currency',
                                                                                            currency: 'USD',
                                                                                            minimumFractionDigits: 0,
                                                                                            maximumFractionDigits: 0,
                                                                                            })}</ButtonComponent>
            </div>
        );
    }

    render() {
        return (
            <div className='contenedor'>
                <br></br>
                <br></br>

                <h1>Grafica Produccion: </h1>
                
                <hr className="border border-3 opacity-100"></hr>

                <h3>Filtros: </h3>
                <h4>1. Tipo periodo: </h4>
                    <select className="form-select" aria-label="Default select example" onChange={this.filtroChange.bind(this)}>
                        <option selected>Seleccione tipo periodo</option>
                        <option value="dia">Dia</option>
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

                <br></br>

                <hr className="border border-3 opacity-100"></hr>

                <br></br>

                <div>
                    <div className="col-lg-100 control-section" id="control_dash">
                    <div className="content-wrapper" style={{ maxWidth: '100%' }}>
                        <DashboardLayoutComponent
                        id="dashboard"
                        columns={6}
                        cellAspectRatio={100 / 85}
                        cellSpacing={[5, 5]}
                        allowDragging={false}
                        ref={(scope) => {
                            this.dashboardObj = scope;
                        }}
                        allowResizing={false}
                        >
                        <PanelsDirective>
                            <PanelDirective
                            header="Gasto de Insumos"
                            content={this.pieUno.bind(this)}
                            sizeX={2}
                            sizeY={2}
                            row={0}
                            col={0}
                            ></PanelDirective>
                            <PanelDirective
                            header="Tipo pedidos Pizzarra"
                            content="Dos"
                            sizeX={2}
                            sizeY={2}
                            row={0}
                            col={2}
                            ></PanelDirective>
                            <PanelDirective
                            header="Tipo pedidos Pizzarra"
                            content="tres"
                            sizeX={2}
                            sizeY={2}
                            row={0}
                            col={4}
                            ></PanelDirective>
                            <PanelDirective
                            header="Ventas vs Target - Periodos"
                            content="Cuatro"
                            sizeX={6}
                            sizeY={2}
                            row={2}
                            col={0}
                            ></PanelDirective>

                            
                            
                            
                        </PanelsDirective>
                        </DashboardLayoutComponent>
                    </div>
                    </div>                    
                </div>
            </div>
        );
    }

    onChartLoad() {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }

    onChartLoadPie() {
        document.getElementById('pie-chart').setAttribute('title', '');
    }

    onChartLoadPie2() {
        document.getElementById('pie-chart02').setAttribute('title', '');
    }

    load(){

    }

    loadPie(){
        //let selectedTheme = location.hash.split('/')[1];
        //selectedTheme = selectedTheme ? selectedTheme : 'Material';
        //args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        //    replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
    }

    loadPie2(){
        //let selectedTheme = location.hash.split('/')[1];
        //selectedTheme = selectedTheme ? selectedTheme : 'Material';
        //args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        //    replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
    }
}

export default adminDashboardProduccion;