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
  MultiColoredLineSeries,
  ChartAnnotation,
  SegmentsDirective,
  SegmentDirective,
  ScatterSeries
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
        this.setState({
          arrayInsumos: data,
          dataLoaded: true,
        });
        this.contractEnd();
      })
      .catch((err) => console.log(err));
  }

  handleTabSelect(e) {
    this.setState({
      indexSelectedTab: e.selectedIndex,
    });
  }

  polarLine() {
    let dataSource = this.state.arrayInsumos.inv?.find(
      (tipoInsumo) =>
        tipoInsumo.tipoInsumo ===
        this.state.headertext[this.state.indexSelectedTab].text
    );

    if (dataSource === undefined || dataSource.result === undefined || dataSource.result.length === 0) {
      return null;
    }

    let maxAbs = Math.max(...dataSource.result.map(item => Math.abs(item.INV_CUADRE)));

    // Ajustar los límites para la simetría
    let max = maxAbs;
    let min = -maxAbs;

    const onChartLoad = (args) => {
      document.getElementById("charts").setAttribute("title", "");
    };
    const load = (args) => {};


    const pointRender = (args) => {

      if (args.point.text === "UNIDAD") {
        if (args.point.y === 0) {
          args.fill = 'green';
        } else {
              args.fill = 'red';
        }
      } else {
        if (Math.abs(args.point.y) < 100) {
          args.fill = 'green';
        } else {
          args.fill = 'red';
        }
      }
   };


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
          title: "Medida del Insumo",
          minimum: min * 1,
          maximum: max * 1,
          interval: (max - min) / 10,
          edgeLabelPlacement: "Shift",
          labelFormat: "{value}",
        }}
        title="Insumos"
        loaded={onChartLoad.bind(this)}
        load={load.bind(this)}
        legendSettings={{ enableHighlight: true }}
        tooltip={{ enable: true }}
        pointRender={pointRender.bind(this)}
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
            ScatterSeries
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={dataSource.result}
            xName="TIPO"
            yName="INV_CUADRE"
            name={dataSource.tipoInsumo}
            text="INV_MEDIDA"
            type="Scatter"
            marker={{
              visible: true,
              height: 7,
              width: 7,
              shape: "Circle",
              isFilled: false,
              dataLabel: { visible: false, name: 'INV_MEDIDA' }
            }}
            width={2}
          >
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  }

  statusTemplate(props) {
    if(props.INV_FLAG){
        return(
            <div id="status" className="statustemp e-activecolor">
            <span className="statustxt e-activecolor">Cumple</span>
            </div>
        )
    }else{
        return (
            <div id="status" className="statustemp e-inactivecolor">
            <span className="statustxt e-inactivecolor">No Cumple</span>
            </div>
        )
    }
   
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
              {/* 
               <ColumnDirective
                field="INV_GASTO"
                headerText="Insumo-Usado-Teorico"
                width="130"
              ></ColumnDirective>
              */}
              <ColumnDirective
                field="INV_FLAG"
                headerText="Insumo-Flag"
                template={this.statusTemplate}
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
          <div style={{ width: "100%" }}>
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
          <div style={{ marginLeft: '10px' }}>
            {
              this.polarLine()
            }
        </div>
        </div>
      </div>
    );
  }
}

export default adminDashboardInsumos;
