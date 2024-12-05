import React, { Component } from "react";

//Componentes
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
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
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  Legend,
  DataLabel,
  LineSeries,
  Category,
  PolarSeries,
  RadarSeries,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
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

export let data1 = [
  { x: "Jan", y: -7.1 },
  { x: "Feb", y: -3.7 },
  { x: "Mar", y: 0.8 },
  { x: "Apr", y: 6.3 },
  { x: "May", y: 13.3 },
  { x: "Jun", y: 18.0 },
  { x: "Jul", y: 19.8 },
  { x: "Aug", y: 18.1 },
  { x: "Sep", y: 13.1 },
  { x: "Oct", y: 4.1 },
  { x: "Nov", y: -3.8 },
  { x: "Dec", y: -6.8 },
];
export let data2 = [
  { x: "Jan", y: -17.4 },
  { x: "Feb", y: -15.6 },
  { x: "Mar", y: -12.3 },
  { x: "Apr", y: -5.3 },
  { x: "May", y: 1.0 },
  { x: "Jun", y: 6.9 },
  { x: "Jul", y: 9.4 },
  { x: "Aug", y: 7.6 },
  { x: "Sep", y: 2.6 },
  { x: "Oct", y: -4.9 },
  { x: "Nov", y: -13.4 },
  { x: "Dec", y: -16.4 },
];

class adminDashboardInsumos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha_inicio_busqueda: "",
      fecha_final_busqueda: "",
      indexSelectedTab: 0,
      arrayInsumos: [],
      local: "",
      dataLoaded: false,
      headertext: [
        { text: "BEBIDAS" },
        { text: "CARNES" },
        { text: "LACTEOS" },
        { text: "MASAS" },
        { text: "OTROS" },
        { text: "VEGETALES-FRUTA" },
      ],
    };

    this.toolbarOptions = ["Search"];
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
        this.state.fecha_final_busqueda +
        `/` +
        this.state.local,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          arrayInsumos: data,
          dataLoaded: true,
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

  polarLine() {
    console.log("polarLine: ", this.state.arrayInsumos.inv);

    let dataSource = this.state.arrayInsumos.inv?.find(
      (tipoInsumo) =>
        tipoInsumo.tipoInsumo ===
        this.state.headertext[this.state.indexSelectedTab].text
    );

    console.log("dataSource: ", dataSource);

    if (dataSource === undefined || dataSource.result === undefined || dataSource.result.length === 0) {
      console.log("null");
      return null;
    }

    const max = Math.max(...dataSource.result.map(item => item.INV_CUADRE));
    const min = Math.min(...dataSource.result.map(item => item.INV_CUADRE));

    const onChartLoad = (args) => {
      document.getElementById("charts").setAttribute("title", "");
    };
    const load = (args) => {};

    return (
      <ChartComponent
        id="charts"
        primaryXAxis={{
          title: "Tipo inventario",
          valueType: "Category",
          labelPlacement: "OnTicks",
          interval: 1,
          coefficient: Browser.isDevice ? 100 : 100,
        }}
        primaryYAxis={{
          title: "Temperature (Celsius)",
          minimum: min,
          maximum: max,
          interval: (max - min) / 10,
          edgeLabelPlacement: "Shift",
          labelFormat: "{value}",
        }}
        title="Insumos"
        loaded={onChartLoad.bind(this)}
        load={load.bind(this)}
        legendSettings={{ enableHighlight: true }}
        tooltip={{ enable: true }}
      >
        <Inject
          services={[
            LineSeries,
            Legend,
            DataLabel,
            Category,
            PolarSeries,
            RadarSeries,
            Tooltip,
            Highlight,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={dataSource.result}
            xName="TIPO"
            yName="INV_CUADRE"
            name={dataSource.tipoInsumo}
            type="Polar"
            marker={{
              visible: true,
              height: 7,
              width: 7,
              shape: "Pentagon",
              isFilled: false,
            }}
            width={2}
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  }

  graficaCostos() {
    let dataSource = this.state.arrayInsumos.inv?.find(
      (tipoInsumo) =>
        tipoInsumo.tipoInsumo ===
        this.state.headertext[this.state.indexSelectedTab].text
    );
    //console.log(this.state.arrayInsumos.inv?.find((tipoInsumo => tipoInsumo.tipoInsumo === this.state.headertext[this.state.indexSelectedTab].text)));
    //let dataSource = this.state.arrayInsumos.inv?.[0].result;

    const onLoad = (args) => {};

    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <GridComponent
            id="overviewgrid"
            dataSource={dataSource?.result}
            toolbar={this.toolbarOptions}
            allowSorting={true}
            allowPaging={true}
            height={650}
            pageSettings={{ pageCount: 4, pageSizes: true, pageSize: 20 }}
            load={onLoad.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="TIPO"
                headerText="Tipo-Insumo"
                width="200"
              ></ColumnDirective>
              <ColumnDirective
                field="INV_CUADRE"
                headerText="Insumos-Resultado"
                width="130"
              ></ColumnDirective>
              <ColumnDirective
                field=""
                headerText="Insumo-Flag"
                width="130"
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Freeze, Toolbar, Page, Sort, Edit]} />
          </GridComponent>
        </div>
      </div>
    );
  }

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

        <h4>3. Seleccione local: </h4>

        <select
          className="form-select"
          style={{ marginTop: "10px", height: "40px", fontSize: "16px" }}
          aria-label="Seleccionar tipo de insumo"
          onChange={(e) => this.setState({ local: e.target.value })}
        >
          <option value="">Seleccionar local</option>
          <option value="Cali-Refugio">Cali</option>
          <option value="Popayan-Centro">Popayan</option>
        </select>

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "50%" }}>
            {/* Render the Tab Component */}
            <TabComponent
              id="defaultTab"
              selected={this.handleTabSelect.bind(this)}
            >
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

          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            {this.polarLine()}
          </div>
        </div>
      </div>
    );
  }
}

export default adminDashboardInsumos;
