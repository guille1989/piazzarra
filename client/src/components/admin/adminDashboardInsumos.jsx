import React, { Component } from "react";

//Componentes
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import GraficaBarrasInsumos from "../componentsaux/graficaBarrasResumenInsumos";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Toolbar,
  Sort,
  Freeze,
  Edit,
} from "@syncfusion/ej2-react-grids";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

class adminDashboardInsumos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha_inicio_busqueda: "",
      fecha_final_busqueda: "",
      indexSelectedTab: 0,
      arrayInsumos: [],
      headertext: [
        { text: "BEBIDAS" },
        { text: "CARNES" },
        { text: "LACTEOS" },
        { text: "MASAS" },
        { text: "OTROS" },
        { text: "VEGETALES-FRUTA" },
      ]
    };

    this.toolbarOptions = ['Search'];
  }

  componentDidMount() {
    //console.log("Componente de adminDashboardInsumos Listo");
    const today = new Date().toISOString().split("T")[0];
    //console.log("Fecha de hoy: " + today);

    const dayOne = new Date();
    const firstDayOfMonth = new Date(
      dayOne.getFullYear(),
      dayOne.getMonth(),
      2
    );
    //console.log("Primer día del mes: " + firstDayOfMonth.toISOString().split("T")[0]);

    // Asignar valor a input con tipo fecha
    document.getElementById("fechaHoyRInventario").value = firstDayOfMonth
      .toISOString()
      .split("T")[0];
    this.setState({
      fecha_inicio_busqueda: firstDayOfMonth.toISOString().split("T")[0],
    });

    // Asignar valor a input con tipo dayOne
    document.getElementById("fechaHoyRInventarioFinal").value = today;
    this.setState({
      fecha_final_busqueda: today,
    });
  }

  handleFechaHoy(e) {
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

    //console.log("Fecha inicio: " + e.target.value);
    this.setState({
      fecha_inicio_busqueda: e.target.value,
    });
  }

  handleFechaFinal(e) {
    //Configuramos hoy
    //console.log("Fecha final: " + e.target.value);
    this.setState({
      fecha_final_busqueda: e.target.value,
    });
  }

  contractBegin() {
    this.contractBtn.element.classList.add("e-round");
  }
  contractEnd() {
    this.contractBtn.element.classList.remove("e-round");
  }

  handleGetInsumosReview() {
    this.contractBegin();
    //console.log("Fecha inicio: " + this.state.fecha_inicio_busqueda);
    //console.log("Fecha final: " + this.state.fecha_final_busqueda);

    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimientocontrolinsumos/` +
        this.state.fecha_inicio_busqueda +
        `/` +
        this.state.fecha_final_busqueda,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          arrayInsumos: data,
        });
        this.contractEnd();
      })
      .catch((err) => console.log(err));
  }

  handleTabSelect(e) {
    console.log("Tab seleccionado ", e.selectedIndex);
    this.setState({
      indexSelectedTab: e.selectedIndex,
    });
  }

  graficaCostos() {
    const tooltip = {
      enable: true,
      header: "Costo Producto",
      shared: true,
      format:
        "Costo : <b>${point.y}</b><br/>% Costo Insumos : <b>${point.size}%</b>",
    };
    let dataSource = this.state.arrayInsumos.inv?.find((tipoInsumo => tipoInsumo.tipoInsumo === this.state.headertext[this.state.indexSelectedTab].text));
    //console.log(this.state.arrayInsumos.inv?.find((tipoInsumo => tipoInsumo.tipoInsumo === this.state.headertext[this.state.indexSelectedTab].text)));
    //let dataSource = this.state.arrayInsumos.inv?.[0].result;
    return (
      <div className='control-pane'>
        <div className='control-section'>
            <GridComponent 
                dataSource={dataSource?.result} 
                toolbar={this.toolbarOptions} 
                allowSorting={true} 
                allowPaging={true} 
                height={650} 
                pageSettings={{ pageCount: 4, pageSizes: true, pageSize: 20 }}           
                >
                <ColumnsDirective>
                    <ColumnDirective field='TIPO' headerText='Tipo-Insumo' width='200'></ColumnDirective>
                    <ColumnDirective field='INV_CUADRE' headerText='Insumos-Usados' width='130'></ColumnDirective>
                    <ColumnDirective field='' headerText='Insumo-Flag' width='130'></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Freeze, Toolbar, Page, Sort, Edit]}/>
            </GridComponent>
        </div>
    </div>
    )};

  render() {    
    // Mapping Tab items Header property
    
    return (
      <div className="contenedor" style={{ height: "100vh" }}>
        <br></br>
        <br></br>

        <h1>Grafica Insumos: </h1>

        <hr className="border border-3 opacity-100"></hr>

        <h3>Filtros: </h3>
        {/* 
                <h4>1. Tipo periodo: </h4>
                    <select className="form-select" aria-label="Default select example" onChange={this.filtroChange.bind(this)}>
                        <option selected>Seleccione tipo periodo</option>
                        <option value="dia">Dia</option>
                        <option value="semana">Semanal</option>
                        <option value="mes">Mensual</option>
                        <option value="semestre">Semestral</option>
                        <option value="anual">anual</option>
                    </select>
                    <br></br>
                */}
        <h4>1. Seleccion Periodos Inicial: </h4>
        <input
          type="date"
          id="fechaHoyRInventario"
          onChange={this.handleFechaHoy.bind(this)}
          className="form-control p-3 g-col-6 ls"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
        <br></br>

        <h4>2. Seleccione Periodos Final: </h4>
        <input
          type="date"
          id="fechaHoyRInventarioFinal"
          onChange={this.handleFechaFinal.bind(this)}
          className="form-control p-3 g-col-6 ls"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />

        <br></br>

        <h4>4. Buscar: </h4>

        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
          <ProgressButtonComponent
            id="contract"
            content="CONSULTAR FECHAS"
            ref={(scope) => {
              this.contractBtn = scope;
            }}
            onClick={() => this.handleGetInsumosReview()}
            className="lg"
            isPrimary
            begin={this.contractBegin.bind(this)}
            end={this.contractEnd.bind(this)}
          ></ProgressButtonComponent>
        </div>

        <br></br>
        <br></br>

        <hr className="border border-3 opacity-100"></hr>
        {/* 
        <div style={{ display: "flex" }}>
          {this.state.arrayInsumos?.inv?.map((insumo, index) => {
            if (insumo.result?.length > 0) {
              return (
                <div key={index} style={{ padding: "10px", height: "250px" }}>
                  {insumo.result.map((item, index2) => {
                    let cssClassStyleChipOnInCuadre = parseInt(item.INV_CUADRE) < 0 ? "e-danger" : (parseInt(item.INV_CUADRE) === 0 ? "e-success" : "e-warning");
                    let invCuadreParsed = parseInt(item.INV_CUADRE, 10);
                    let stringTorender = item.TIPO + ":  " + invCuadreParsed;
                    return (
                      <ChipListComponent
                          id="chip-default"
                          aria-labelledby="chips"
                          key={index2}
                        >
                          <ChipsDirective>
                            <ChipDirective
                              text={stringTorender}
                              cssClass={cssClassStyleChipOnInCuadre}
                            ></ChipDirective>
                          </ChipsDirective>
                        </ChipListComponent>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
        */}

        <div className="control-pane">
          <div className="control-section tab-control-section">
            {/* Render the Tab Component */}
            <TabComponent id="defaultTab" selected={this.handleTabSelect.bind(this)}>
              <TabItemsDirective>
                <TabItemDirective
                  header={this.state.headertext[0]}
                  content={this.graficaCostos.bind(this)}
                />

                <TabItemDirective
                  header={this.state.headertext[1]}
                  content={this.graficaCostos.bind(this)}
                />

                <TabItemDirective
                  header={this.state.headertext[2]}
                  content={this.graficaCostos.bind(this)}
                />

                <TabItemDirective
                  header={this.state.headertext[3]}
                  content={this.graficaCostos.bind(this)}
                />

                <TabItemDirective
                  header={this.state.headertext[4]}
                  content={this.graficaCostos.bind(this)}
                />

                <TabItemDirective
                  header={this.state.headertext[5]}
                  content={this.graficaCostos.bind(this)}
                />
              </TabItemsDirective>
            </TabComponent>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default adminDashboardInsumos;
