import React, { Component, ReactElement } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  Highlight,
  LineSeries,
  TrendlineDirective,
  TrendlinesDirective,
  Trendlines,
} from "@syncfusion/ej2-react-charts";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import {
  DashboardLayoutComponent,
  PanelsDirective,
  PanelDirective,
} from "@syncfusion/ej2-react-layouts";
import {
  ButtonComponent,
  CheckBoxComponent,
  FabComponent,
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Browser } from "@syncfusion/ej2-base";

class adminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro_seleccion: "semana",
      filter_ventas: [],
      filter_ventas_popayan: [],
      filet_limits: [],
      filter_ventas_tipo: [],
      filter_ventas_tipo_popayan: [],
      ventas_promedio_cali: 0,
      ventas_promedio_popayan: "",
      ventas_totales_cali: 0,
      ventas_totales_popayan: "",
      tiquet_medio_cali: 0,
      tiquet_medio_popayan: "",
      local: "",

      filter_ventas_por_tipo: [],

      ventas_totales: 0,
      ventas_promedio: 0,
      tiquet_medio: 0,
      tipo_grafica_indicador: "suma_ventas",
    };
  }

  componentDidMount() {
    //Fecha
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    document.getElementById("fechaHoyRInventarioFinal").value = today;
    // Asignar valor a input con tipo fecha
    const dayOne = new Date();
    const firstDayOfMonth = new Date(
      dayOne.getFullYear(),
      dayOne.getMonth(),
      2
    );
    document.getElementById("fechaHoyRInventario").value = firstDayOfMonth
      .toISOString()
      .split("T")[0];

    this.setState({
      fecha_final_busqueda: today,
      fecha_inicio_busqueda: firstDayOfMonth.toISOString().split("T")[0],
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

    this.setState({
      fecha_inicio_busqueda: e.target.value,
    });
  }

  handleFechaFinal(e) {
    //Configuramos hoy
    //console.log(e.target.value)
    this.setState({
      fecha_final_busqueda: e.target.value,
    });
  }

  filtroChange(event) {
    this.setState({
      filtro_seleccion: event.target.value,
    });
  }

  //---------*
  ventasPopayan() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );

    return element;
  }

  pieUno() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <AccumulationChartComponent
          id="pie-chart"
          title="Tipo pedidos Pizzarra"
          enableSmartLabels={true}
          load={this.loadPie.bind(this)}
          tooltip={{
            enable: true,
            format: "<b>${point.x}</b><br>Numero de pedidos: <b>${point.y}</b>",
          }}
          loaded={this.onChartLoadPie.bind(this)}
          enableBorderOnMouseMove={true}
          legendSettings={{ visible: false }}
        >
          <Inject services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={this.state.filter_ventas_por_tipo}
              xName="_id"
              yName="numero_de_ventas"
              innerRadius="40%"
              startAngle={0}
              endAngle={360}
              radius="75%"
              explode={true}
              explodeOffset="10%"
              explodeIndex={0}
              dataLabel={{
                visible: true, position: 'Outside',
                name: "_id",
                font: {
                  fontWeight: "600",
                },
              }}
            ></AccumulationSeriesDirective>
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    );
  }

  graficaVentas() {
    let maxValue = Math.max(
      ...this.state.filter_ventas.map((item) => item.suma_ventas)
    );
    let ylabel = "Ventas totales";
    let ylabelformat = "${value}";

    if (this.state.tipo_grafica_indicador === "total_pedidos") {
      maxValue = Math.max(
        ...this.state.filter_ventas.map((item) => item.total_pedidos)
      );
      ylabel = "Numero Pedidos";
      ylabelformat = "{value}";
    } else if (this.state.tipo_grafica_indicador === "tiquet_medio") {
      maxValue = Math.max(
        ...this.state.filter_ventas.map((item) => item.tiquet_medio)
      );
      ylabel = "Tiquet Medio";
    }

    const tooltip = {
      enable: true,
      header: "Informacion General",
      format: "<b>${point.x} : ${point.y}</b>",
    };

    return (
      <div style={{ height: "90%", width: "100%" }}>
        <select
          className="form-select"
          style={{
            marginLeft: "30px",
            marginTop: "10px",
            height: "40px",
            width: "25%",
            fontSize: "16px",
          }}
          onChange={(e) => {
            e.preventDefault();
            this.setState({ tipo_grafica_indicador: e.target.value });
          }}
          value={this.state.tipo_grafica_indicador}
        >
          <option value="suma_ventas">Ventas</option>
          <option value="total_pedidos">Numero Pedidos</option>
          <option value="tiquet_medio">Tiquet Medio</option>
        </select>
        <br></br>
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          legendSettings={{ enableHighlight: true }}
          primaryXAxis={{
            valueType: "Category",
            interval: 1,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
          }}
          primaryYAxis={{
            title: ylabel,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            maximum: maxValue * 1.2,
            interval: maxValue / 5,
            labelFormat: ylabelformat,
          }}
          useGroupingSeparator={true}
          chartArea={{ border: { width: 0 } }}
          load={this.load.bind(this)}
          tooltip={tooltip}
          width={Browser.isDevice ? "100%" : "100%"}
          loaded={this.onChartLoad.bind(this)}
        >
          <Inject
            services={[
              ColumnSeries,
              LineSeries,
              Legend,
              Tooltip,
              Category,
              DataLabel,
              Highlight,
              Trendlines,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={this.state.filter_ventas}
              tooltip={tooltip}
              xName="_id"
              columnSpacing={0.1}
              yName={this.state.tipo_grafica_indicador}
              name={ylabel}
              type="Column"
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Middle",
                  font: { fontWeight: "2W00", color: "#000000" },
                },
              }}
            >
              <TrendlinesDirective>
                <TrendlineDirective
                  type="Linear"
                  width={3}
                  marker={{ visible: false }}
                  name="Tendencia"
                  fill="#C64A75"
                ></TrendlineDirective>
              </TrendlinesDirective>
            </SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  ventasReviewTotales() {
    return (
      <div className="ventasTotalesKPI">
        {parseInt(this.state.ventas_totales_cali).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </div>
    );
  }

  ventasReview() {
    return (
      <div className="cuadroventas">
        <div className="kpisContenedorVentas">
          <div className="kpiIndicatorVentasEspecial">
            <div>
              <div className="e-card-header-title">
                Ventas Total Periodo Cali - Refugio:
              </div>
              <div className="e-card-sub-title">
                {parseInt(this.state.ventas_totales_cali).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }
                )}
              </div>
            </div>
            <div className="vertical-line"></div>

            <div>Hola</div>
          </div>

          <div className="kpiIndicatorVentas">
            <div className="e-card-header-title">
              Ventas Promedio Periodo Cali - Refugio:
            </div>
            <div className="e-card-sub-title">
              {parseInt(this.state.ventas_promedio_cali).toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}
            </div>
          </div>

          <div className="kpiIndicatorVentas">
            <div className="e-card-header-title">
              Tiquet Medio Periodo Cali - Refugio:
            </div>
            <div className="e-card-sub-title">
              {parseInt(this.state.tiquet_medio_cali).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        </div>

        <h3>Ventas Total Periodo Popayan - Centro: </h3>

        <ButtonComponent cssClass="e-info">
          {parseInt(this.state.ventas_totales_popayan).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </ButtonComponent>

        <h3>Ventas Promedio Periodo Popayan - Centro: </h3>

        <ButtonComponent cssClass="e-info">
          {parseInt(this.state.ventas_promedio_popayan).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          )}
        </ButtonComponent>

        <h3>Tiquet Medio Periodo Popayan - Centro: </h3>

        <ButtonComponent cssClass="e-info">
          {parseInt(this.state.tiquet_medio_popayan).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </ButtonComponent>
      </div>
    );
  }

  contractBtn;

  contractBegin() {
    this.contractBtn.element.classList.add("e-round");
  }
  contractEnd() {
    this.contractBtn.element.classList.remove("e-round");
  }

  handleBusquedaFechas(local) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/graficasventas/` +
        this.state.fecha_inicio_busqueda +
        `/` +
        this.state.fecha_final_busqueda +
        `/` +
        local,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ventas_totales:
            data.inv.resut_ventas_totales01[0].suma_ventas_totales,
          ventas_promedio:
            data.inv.resut_ventas_totales01[0].suma_ventas_totales /
            data.inv.result04.length,
          filter_ventas_tipo: data.inv.tipo_pedido,
          filter_ventas: data.inv.result04,
          filter_ventas_por_tipo: data.inv.result09_ventas_tipo,
        });
        this.contractEnd();
      });

    //fetchAdicional
    const requestOptionsAux = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/graficatiquetmedio/` +
        this.state.fecha_inicio_busqueda +
        `/` +
        this.state.fecha_final_busqueda +
        `/` +
        local,
      requestOptionsAux
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          tiquet_medio: data.tiquet_medio[0].ticketMedio,
        });
      });
  }

  render() {
    return (
      <div className="contenedor">
        <br></br>
        <br></br>

        <h1>Grafica Ventas: </h1>

        <hr className="border border-3 opacity-100"></hr>

        <h3>Filtros: </h3>
        <h4>1. Seleccione Periodos Inicial: </h4>
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

        <h4>3. Seleccione Local: </h4>

        <select
          className="form-select"
          style={{ marginTop: "10px", height: "40px", fontSize: "16px" }}
          aria-label="Seleccionar tipo de insumo"
          onChange={(e) => {
            e.preventDefault();
            this.setState({ local: e.target.value });
            this.handleBusquedaFechas(e.target.value);
          }}
        >
          <option value="">Seleccionar local</option>
          <option value="Cali-Refugio">Cali</option>
          <option value="Popayan-Centro">Popayan</option>
          <option value="todos">Totales</option>
        </select>

        <br></br>

        <hr className="border border-3 opacity-100"></hr>

        <br></br>

        <div>
          <div className="kpisContenedorVentas">
            <div
              style={{ display: "flex", flexDirection: "row" }}
              className="kpiIndicatorVentasEspecial"
            >
              <div style={{ width: "35%", marginRight: "40px" }}>
                <div className="indicadorKPIVentas">Ventas Totales:</div>
                <div className="valorKPIventas">
                  {parseInt(this.state.ventas_totales).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>

              <div className="vertical-line"></div>

              {this.state.filter_ventas_por_tipo.map((item, index) => {
                return (
                  <div key={index} style={{ width: "15%", marginRight: "0px" }}>
                    <div className="indicadorKPIVentasAux">{item._id}:</div>
                    <div className="indicadorKPIVentasAux">% {(parseInt(item.valor_total) * 100 / parseInt(this.state.ventas_totales)).toFixed(1)}</div>
                    <div className="indicadorKPIVentasAux">
                      {parseInt(item.valor_total).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                );}
              )}
            </div>

            <div className="kpiIndicatorVentas">
              <div className="indicadorKPIVentas">Promedio Ventas:</div>
              <div className="valorKPIventas">
                {parseInt(this.state.ventas_promedio).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            <div className="kpiIndicatorVentas">
              <div className="indicadorKPIVentas">Tiquet Medio:</div>
              <div className="valorKPIventas">
                {parseInt(this.state.tiquet_medio).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-100 control-section" id="control_dash">
            <div className="content-wrapper" style={{ maxWidth: "100%" }}>
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
                    header="Tipo pedidos Pizzarra"
                    content={this.pieUno.bind(this)}
                    sizeX={2}
                    sizeY={2}
                    row={0}
                    col={2}
                  ></PanelDirective>

                  <PanelDirective
                    header="Ventas vs Target - Periodos"
                    content={this.graficaVentas.bind(this)}
                    sizeX={4}
                    sizeY={2}
                    row={0}
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
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  }

  onChartLoadPie() {
    document.getElementById("pie-chart").setAttribute("title", "");
  }

  onChartLoadPie2() {
    document.getElementById("pie-chart02").setAttribute("title", "");
  }

  load() {}

  loadPie() {
    //let selectedTheme = location.hash.split('/')[1];
    //selectedTheme = selectedTheme ? selectedTheme : 'Material';
    //args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
    //    replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
  }

  loadPie2() {
    //let selectedTheme = location.hash.split('/')[1];
    //selectedTheme = selectedTheme ? selectedTheme : 'Material';
    //args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
    //    replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
  }
}

export default adminDashboard;
