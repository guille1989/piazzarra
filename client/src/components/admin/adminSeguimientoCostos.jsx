import React, { Component } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, Legend, DateTime, Tooltip, Highlight, StackingLineSeries, Category, Crosshair } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import {
    DashboardLayoutComponent,
    PanelsDirective,
    PanelDirective,
  } from '@syncfusion/ej2-react-layouts';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Sort } from '@syncfusion/ej2-react-grids';
import '../../App.css'

class adminSeguimientoCostos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_costos_personal: [],
            data_costos_mediana: [],
            data_costo_pantalon: [],
            data_costo_pancook: [],
            data_costo_lasagna_napolitana: [],
            data_costo_lasagna_queso: [],
            data_costo_sapguetti_napolitana: [],
            data_costo_fetuccini_napolitana: [],
            data_costo_sapguetti_queso: [],
            data_costo_fetuccini_queso: [],
            data_tabla_One: [],
            data_tabla_Two: [],
            data_tabla_Tree: [],
            data_costo_desayuno_cafe: [],
            data_costo_desayuno_chocolate: [],
            data_costo_desayuno_te: [],
            data_costo_desayuno_aromatica: [],
        }
    }

    componentDidMount(){

        const fetchOptions = {
            method: 'GET',
            headers: {'Content-type':'application/json'},  
        }

        //Traemos Costos
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`, fetchOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    data_costos_personal: data.info.costoPizzaPersonalAux,
                    data_costos_mediana: data.info.costoPizzaGrandeAux,
                    data_costo_pantalon: data.info.costoPizzaPantalonAux,
                    data_costo_pancook: data.info.costoPizzaPacookAux,
                    data_costo_lasagna_napolitana: data.info.costoPizzaLasagnaNapolitanaAux,
                    data_costo_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
                    data_costo_sapguetti_napolitana: data.info.costoPizzaSpaguettiNapolitanaAux,
                    data_costo_fetuccini_napolitana: data.info.costoPizzaFetucciniNapolitanaAux,
                    data_costo_sapguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
                    data_costo_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux,
                    data_tabla_One: data.info.costoPizzaPersonalAux,
                    data_tabla_Two: data.info.costoPizzaLasagnaNapolitanaAux,
                    valor_table_two: 1,
                    valor_table_one: 1,
                    valor_table_tree: 1,
                    data_tabla_Tree: data.info.costoDesayunoCafe,
                    data_costo_desayuno_cafe: data.info.costoDesayunoCafe,
                    data_costo_desayuno_chocolate: data.info.costoDesayunoChocolate,
                    data_costo_desayuno_te: data.info.costoDesayunoTe,
                    data_costo_desayuno_aromatica: data.info.costoDesayunoAromatica
                })
            })

    }

    graficaCostos(){
        const tooltip = {
            enable: true, header: 'Costo Producto', shared: true,
            format: "Costo : <b>${point.y}</b><br/>% Costo Insumos : <b>${point.size}%</b>"
        };
        return(
                
                <div>
                <ChartComponent 
                    id='charts' 
                    style={{ textAlign: "center" }} 
                    primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, valueType: 'Category' }} 
                    primaryYAxis={{ title: 'Costo Producto', lineStyle: { width: 0 }, minimum: 0, maximum: 20000, interval: 5000, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '${value}', }} 
                    legendSettings={{ enableHighlight: true }} 
                    width={Browser.isDevice ? '100%' : '95%'} 
                    chartArea={{ border: { width: 0 } }} 
                    load={this.load.bind(this)}                     
                    crosshair={{ enable: true, lineType: 'Vertical' }}
                    tooltip={tooltip}> 
                    <Inject services={[LineSeries, Category, Legend, Tooltip, Highlight, Crosshair]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={this.state.data_costos_personal} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Pizza Personal' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={this.state.data_costos_mediana} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Pizza Grande' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={this.state.data_costo_pantalon} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Pizza Pantalon' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={this.state.data_costo_pancook} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Pizza Pancook' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                </div>
                
        )
    }

    graficaCostosLP(){
        const tooltip2 = {
            enable: true, header: 'Costo Producto', shared: true,
            format: "Costo : <b>${point.y}</b><br/>% Costo Insumos : <b>${point.size}%</b>"
        }
        return(
            <div>
                <ChartComponent 
                    id='charts2' 
                    style={{ textAlign: "center" }} 
                    primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, valueType: 'Category' }} 
                    primaryYAxis={{ title: 'Costo Producto', lineStyle: { width: 0 }, minimum: 0, maximum: 25000, interval: 5000, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '${value}', }} 
                    legendSettings={{ enableHighlight: true }} 
                    width={Browser.isDevice ? '100%' : '95%'} 
                    chartArea={{ border: { width: 0 } }} 
                    load={this.load2.bind(this)} 
                    crosshair={{ enable: true, lineType: 'Vertical' }}
                    tooltip={tooltip2}> 
                    <Inject services={[LineSeries, Category, Legend, Tooltip, Highlight, Crosshair]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={this.state.data_costo_lasagna_napolitana} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Lasagna S-Napolitana' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={this.state.data_costo_lasagna_queso} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Lasagna S-Queso' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>

                        <SeriesDirective dataSource={this.state.data_costo_sapguetti_napolitana} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Spaguetti S-Napolitana' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={this.state.data_costo_fetuccini_napolitana} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Fetuccini S-Napolitana' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>

                        <SeriesDirective dataSource={this.state.data_costo_sapguetti_queso} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Spaguetti S-Queso' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                        <SeriesDirective dataSource={this.state.data_costo_fetuccini_queso} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Fetuccini S-Queso' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                </div>
                
        )
    }

    graficaCostosD(){
        const tooltip3 = {
            enable: true, header: 'Costo Producto', shared: true,
            format: "Costo : <b>${point.y}</b><br/>% Costo Insumos : <b>${point.size}%</b>"
        }
        return(
            <div>
                <ChartComponent 
                    id='charts3' 
                    style={{ textAlign: "center" }} 
                    primaryXAxis={{ majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, valueType: 'Category' }} 
                    primaryYAxis={{ title: 'Costo Producto', lineStyle: { width: 0 }, minimum: 0, maximum: 25000, interval: 5000, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '${value}', }} 
                    legendSettings={{ enableHighlight: true }} 
                    width={Browser.isDevice ? '100%' : '95%'} 
                    chartArea={{ border: { width: 0 } }} 
                    load={this.load3.bind(this)} 
                    crosshair={{ enable: true, lineType: 'Vertical' }}
                    tooltip={tooltip3}> 
                    <Inject services={[LineSeries, Category, Legend, Tooltip, Highlight, Crosshair]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={this.state.data_costo_desayuno_cafe} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Desayuno-Cafe' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>

                        <SeriesDirective dataSource={this.state.data_costo_desayuno_chocolate} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Desayuno-Chocolate' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>

                        <SeriesDirective dataSource={this.state.data_costo_desayuno_aromatica} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Desayuno-Aromatica' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>

                        <SeriesDirective dataSource={this.state.data_costo_desayuno_te} xName='SABOR_PRODUCTO' yName='COSTO_PRODUCTO' name='Desayuno-Te' size='PORCENTAJE_DE_INSUMOS' width={2} type='Line' marker={{ isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 }}>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                </div>
               
        )
    }

    tablaCostosPPP(){
        return(
            <div className='control-pane'>
                <div className='control-section row'>
                    <GridComponent allowSorting={true} dataSource={this.state.data_tabla_One} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }}>
                        <ColumnsDirective>
                            <ColumnDirective field='SABOR_PRODUCTO' headerText='Sabor' width='150'></ColumnDirective>
                            <ColumnDirective field='COSTO_PRODUCTO' headerText='Costo Insumos' width='90'></ColumnDirective>
                            <ColumnDirective field='COSTO_PRODUCTO_VENTA' headerText='Costo Venta' width='90' textAlign='Right'/>
                            <ColumnDirective field='PORCENTAJE_DE_INSUMOS' headerText='% Costo Venta' width='90' textAlign='Right'/>
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page, Sort]}/>
                    </GridComponent>
                </div>
            </div>
        )
    }

    headerPrimeraTable(){
        return(
            <div style={{display: 'flex'}}>
            
            <select class="w-50" value={this.state.valor_table_one} aria-label="Default select example" 
            onChange={(e) => {                
                        if(e.target.value === "1"){
                            this.setState({
                                data_tabla_One: this.state.data_costos_personal,
                                valor_table_one: 1
                            })
                        }else if(e.target.value === "2"){
                            this.setState({
                                data_tabla_One: this.state.data_costos_mediana,
                                valor_table_one: 2
                            })
                        }else if(e.target.value === "3"){
                            this.setState({
                                data_tabla_One: this.state.data_costo_pantalon,
                                valor_table_one: 3
                            })
                        }else if(e.target.value === "4"){
                            this.setState({
                                data_tabla_One: this.state.data_costo_pancook,
                                valor_table_one: 4
                            })
                        }
                    }}>
                <option selected>Seleccione Tipo de Producto</option>
                <option value="1">Pizza Personal</option>
                <option value="2">Pizza Grande</option>
                <option value="3">Pizza Pantalin</option>
                <option value="4">Pizza Pancook</option>
            </select>
            </div>            
        )
    }
    
    tablaCostosLP(){
        return(
            <div className='control-pane'>
                <div className='control-section row'>
                    <GridComponent allowSorting={true} dataSource={this.state.data_tabla_Two} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }}>
                        <ColumnsDirective>
                            <ColumnDirective field='SABOR_PRODUCTO' headerText='Sabor' width='150'></ColumnDirective>
                            <ColumnDirective field='COSTO_PRODUCTO' headerText='Costo Insumos' width='90'></ColumnDirective>
                            <ColumnDirective field='COSTO_PRODUCTO_VENTA' headerText='Costo Venta' width='90' textAlign='Right'/>
                            <ColumnDirective field='PORCENTAJE_DE_INSUMOS' headerText='% Costo Venta' width='90' textAlign='Right'/>
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page, Sort]}/>
                    </GridComponent>
                </div>
            </div>
        )
    }

    tablaCostosD(){
        return(
            <div className='control-pane'>
                <div className='control-section row'>
                    <GridComponent allowSorting={true} dataSource={this.state.data_tabla_Tree} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }}>
                        <ColumnsDirective>
                            <ColumnDirective field='SABOR_PRODUCTO' headerText='Sabor' width='150'></ColumnDirective>
                            <ColumnDirective field='COSTO_PRODUCTO' headerText='Costo Insumos' width='90'></ColumnDirective>
                            <ColumnDirective field='COSTO_PRODUCTO_VENTA' headerText='Costo Venta' width='90' textAlign='Right'/>
                            <ColumnDirective field='PORCENTAJE_DE_INSUMOS' headerText='% Costo Venta' width='90' textAlign='Right'/>
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page, Sort]}/>
                    </GridComponent>
                </div>
            </div>
        )
    }

    headerTerceraTable(){
        return(
            <div style={{display: 'flex'}}>
            
            <select class="w-50" value={this.state.valor_table_tree} aria-label="Default select example" 
            onChange={(e) => {                
                        if(e.target.value === "1"){
                            this.setState({
                                data_tabla_Tree: this.state.data_costo_desayuno_cafe,
                                valor_table_tree: 1
                            })
                        }else if(e.target.value === "2"){
                            this.setState({
                                data_tabla_Tree: this.state.data_costo_desayuno_chocolate,
                                valor_table_tree: 2
                            })
                        }else if(e.target.value === "3"){
                            this.setState({
                                data_tabla_Tree: this.state.data_costo_desayuno_aromatica,
                                valor_table_tree: 3
                            })
                        }else if(e.target.value === "4"){
                            this.setState({
                                data_tabla_Tree: this.state.data_costo_desayuno_te,
                                valor_table_tree: 4
                            })
                        }
                    }}>
                <option selected>Seleccione Tipo de Producto</option>
                <option value="1">Desayuno Cafe</option>
                <option value="2">Desayuno Chocolate</option>
                <option value="3">Desayuno Aromatica</option>
                <option value="4">Desayuno Te</option>
            </select>
            </div>            
        )
    }

    headerSegundaTable(){
        return(
            <div style={{display: 'flex'}}>
            
            <select class="w-50" value={this.state.valor_table_two} aria-label="Default select example" 
            onChange={(e) => {                
                        if(e.target.value === "1"){
                            this.setState({
                                data_tabla_Two: this.state.data_costo_lasagna_napolitana,
                                valor_table_two: 1
                            })
                        }else if(e.target.value === "2"){
                            this.setState({
                                data_tabla_Two: this.state.data_costo_lasagna_queso,
                                valor_table_two: 2
                            })
                        }else if(e.target.value === "3"){
                            this.setState({
                                data_tabla_Two: this.state.data_costo_sapguetti_napolitana,
                                valor_table_two: 3
                            })
                        }else if(e.target.value === "4"){
                            this.setState({
                                data_tabla_Two: this.state.data_costo_sapguetti_queso,
                                valor_table_two: 4
                            })
                        }else if(e.target.value === "5"){
                            this.setState({
                                data_tabla_Two: this.state.data_costo_fetuccini_napolitana,
                                valor_table_two: 4
                            })
                        }else if(e.target.value === "6"){
                            this.setState({
                                data_tabla_Two: this.state.data_costo_fetuccini_queso,
                                valor_table_two: 4
                            })
                        }
                    }}>
                <option selected>Seleccione Tipo de Producto</option>
                <option value="1">Pizza Lasagna-Napolitana</option>
                <option value="2">Pizza Lasagna-Queso</option>
                <option value="3">Pizza Pasta-Spaguetti-Napolitana</option>
                <option value="4">Pizza Pasta-Spaguetti-Queso</option>
                <option value="5">Pizza Pasta-Fetuccini-Napolitana</option>
                <option value="6">Pizza Pasta-Fetuccini-Queso</option>
            </select>
            </div>            
        )
    }

    render() {
        return (
            <div className='contenedor'>
                <br></br>
                <br></br>

                <h1>Seguimiento Costos de Produccion: </h1>
                
                <hr className="border border-3 opacity-100"></hr>

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
                            header="Grafica de Costos de Productos - PIZZAS, PANTALON y PANCOOK"
                            content={this.graficaCostos.bind(this)}
                            sizeX={6}
                            sizeY={2}
                            row={0}
                            col={0}
                            ></PanelDirective>

                            {/* 
                            <PanelDirective
                            header={this.headerPrimeraTable.bind(this)}
                            content={this.tablaCostosPPP.bind(this)}
                            sizeX={2}
                            sizeY={2}
                            row={0}
                            col={5}
                            ></PanelDirective>
                            */}

                            <PanelDirective
                            header="Grafica de Costos de Productos - LASAGNAS y PASTAS"
                            content={this.graficaCostosLP.bind(this)}
                            sizeX={6}
                            sizeY={2}
                            row={2}
                            col={0}
                            ></PanelDirective>

                            {/* 
                            <PanelDirective
                            header={this.headerSegundaTable.bind(this)}
                            content={this.tablaCostosLP.bind(this)}
                            sizeX={2}
                            sizeY={2}
                            row={2}
                            col={5}
                            ></PanelDirective>
                            */}

                            <PanelDirective
                            header="Grafica de Costos de Productos - DESAYUNOS"
                            content={this.graficaCostosD.bind(this)}
                            sizeX={6}
                            sizeY={2}
                            row={4}
                            col={0}
                            ></PanelDirective>

                            {/* 
                            <PanelDirective
                            header={this.headerTerceraTable.bind(this)}
                            content={this.tablaCostosD.bind(this)}
                            sizeX={2}
                            sizeY={2}
                            row={4}
                            col={5}
                            ></PanelDirective>
                            */}

                        </PanelsDirective>
                        </DashboardLayoutComponent>
                    </div>
                    </div>                    
                </div>

            </div>
        );
    }

    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    load(args) {
       
    }
    ;

    onChartLoad2(args) {
        let chart = document.getElementById('charts2');
        chart.setAttribute('title', '');
    }
    ;
    load2(args) {
       
    }
    ;

    onChartLoad3(args) {
        let chart = document.getElementById('charts3');
        chart.setAttribute('title', '');
    }
    ;
    load3(args) {
       
    }
    ;
}

export default adminSeguimientoCostos;