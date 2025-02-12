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
  HistogramSeries,
} from "@syncfusion/ej2-react-charts";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

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
      filter_ventas_mes: [],
      filter_ventas_popayan: [],
      filet_limits: [],
      filter_ventas_tipo: [],
      filter_ventas_tipo_popayan: [],
      filter_ventas_tipo_pizzas: [],
      filter_ventas_tipo_sabores: [],
      ventas_promedio_cali: 0,
      ventas_promedio_popayan: "",
      ventas_totales_cali: 0,
      ventas_totales_popayan: "",
      tiquet_medio_cali: 0,
      tiquet_medio_popayan: "",
      local: "",
      ventas_dia: true,
      filter_ventas_por_tipo: [],
      filter_horas_pedidos: [],
      ventas_totales: 0,
      ventas_promedio: 0,
      tiquet_medio: 0,
      tipo_grafica_indicador: "suma_ventas",
      filter_ventas_por_tipo_mesa: [],
      filter_ventas_por_tipo_domicilio: [],
      filter_ventas_por_tipo_recogen: [],
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
          <Inject
            services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]}
          />
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
                visible: true,
                position: "Outside",
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

  barrasPizzasVentas() {
    let maxValue = Math.max(
      ...this.state.filter_ventas_tipo_pizzas.map((item) => item.Y)
    );
    let ylabel = "Numero de productos vendidos";
    let ylabelformat = "{value}";

    const tooltip = {
      enable: true,
      header: "Informacion General",
      format: "<b>${point.x} : ${point.y}</b>",
    };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <ChartComponent
          id="chart-pizzas"
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
          load={this.loadVentasPizzas.bind(this)}
          tooltip={tooltip}
          width={Browser.isDevice ? "100%" : "100%"}
          loaded={this.onChartLoadVentasPizzas.bind(this)}
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
              dataSource={this.state.filter_ventas_tipo_pizzas}
              tooltip={tooltip}
              xName="X"
              columnSpacing={0.1}
              yName="Y"
              name={ylabel}
              type="Column"
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Middle",
                  font: { fontWeight: "2W00", color: "#000000" },
                },
              }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  barrasPizzasVentasSabores() {
    let maxValue = Math.max(
      ...this.state.filter_ventas_tipo_sabores.map((item) => item.Y)
    );
    let ylabel = "Numero de sabores mas vendidos";
    let ylabelformat = "{value}";

    const tooltip = {
      enable: true,
      header: "Informacion General",
      format: "<b>${point.x} : ${point.y}</b>",
    };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <ChartComponent
          id="chart-pizzas-sabores"
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
          load={this.loadVentasPizzasSabores.bind(this)}
          tooltip={tooltip}
          width={Browser.isDevice ? "100%" : "100%"}
          loaded={this.onChartLoadVentasPizzasSabores.bind(this)}
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
              dataSource={this.state.filter_ventas_tipo_sabores}
              tooltip={tooltip}
              xName="X"
              columnSpacing={0.1}
              yName="Y"
              name={ylabel}
              type="Column"
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Middle",
                  font: { fontWeight: "2W00", color: "#000000" },
                },
              }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  histograma() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <ChartComponent
          id="chartsHistograma"
          style={{ textAlign: "center" }}
          load={this.loadHistograma.bind(this)}
          primaryXAxis={{
            majorGridLines: { width: 0 },
            title: "Horas del dia",
            minimum: 6,
            maximum: 24,
            edgeLabelPlacement: "Shift",
          }}
          primaryYAxis={{
            title: "Numero de pedidos",
            minimum: 0,
            maximum: this.state.filter_horas_pedidos.length / 2,
            interval: this.state.filter_horas_pedidos.length / 10,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, header: " " }}
          width={Browser.isDevice ? "100%" : "100%"}
          legendSettings={{ visible: false }}
          loaded={this.onChartLoadHistograma.bind(this)}
        >
          <Inject
            services={[HistogramSeries, Legend, Tooltip, Category, DataLabel]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={this.state.filter_horas_pedidos}
              yName="y"
              name="Score"
              type="Histogram"
              marker={{
                visible: true,
                height: 7,
                width: 7,
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { color: "#ffffff", fontWeight: "600" },
                },
              }}
              showNormalDistribution={true}
              columnWidth={1}
              binInterval={1}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  graficaVentas() {
    let maxValue = Math.max(
      ...this.state.filter_ventas.map((item) => item.suma_ventas)
    );
    let ylabel = "Ventas totales - dia";
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

    let isVentasDia = false;
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
            let selection = e.target.value;
            if (selection === "totalVentas")
              this.setState({ ventas_dia: false });
            else this.setState({ ventas_dia: true });

            this.setState({ tipo_grafica_indicador: e.target.value });
          }}
          value={this.state.tipo_grafica_indicador}
        >
          <option value="suma_ventas">Ventas totales - dias</option>
          <option value="totalVentas">Ventas totales - mes</option>
          <option value="total_pedidos">Numero Pedidos</option>
          <option value="tiquet_medio">Tiquet Medio</option>
        </select>
        <br></br>
        {this.state.ventas_dia ? (
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
        ) : (
          this.graficaVentasMes()
        )}
      </div>
    );
  }

  graficaVentasMes() {
    let maxValue = Math.max(
      ...this.state.filter_ventas_mes.map((item) => item.totalVentas)
    );
    let ylabel = "Ventas totales - mes";
    let ylabelformat = "${value}";

    const tooltip = {
      enable: true,
      header: "Informacion General",
      format: "<b>${point.x} : ${point.y}</b>",
    };
    return (
      <>
        <ChartComponent
          id="chartsVentas"
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
          load={this.loadVentas.bind(this)}
          tooltip={tooltip}
          width={Browser.isDevice ? "100%" : "100%"}
          loaded={this.onChartLoadVentas.bind(this)}
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
              dataSource={this.state.filter_ventas_mes}
              tooltip={tooltip}
              xName="_id"
              columnSpacing={0.1}
              yName="totalVentas"
              name={ylabel}
              type="Column"
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Middle",
                  font: { fontWeight: "2W00", color: "#000000" },
                },
              }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </>
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
        console.log("Data: ", data);
        this.setState({
          ventas_totales:
            data.inv.resut_ventas_totales01[0].suma_ventas_totales,
          ventas_promedio:
            data.inv.resut_ventas_totales01[0].suma_ventas_totales /
            data.inv.result04.length,
          filter_ventas_tipo: data.inv.tipo_pedido,
          filter_ventas: data.inv.result04,
          filter_ventas_por_tipo: data.inv.result09_ventas_tipo,
          filter_ventas_mes: data.inv.resultVentasMes,
          filter_horas_pedidos: data.inv.horasChartData,
          filter_ventas_por_tipo_mesa: data.inv.result06_tipo[0],
          filter_ventas_por_tipo_domicilio: data.inv.result07_tipo[0],
          filter_ventas_por_tipo_recogen: data.inv.result08_tipo[0],
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
        console.log("Tiquet medio: ", data);
        this.setState({
          tiquet_medio: data.tiquet_medio[0].ticketMedio,
        });
      });

    //fetch tipo ventas
    const requestOptionsTipoVentas = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/ventasportipo/` +
        this.state.fecha_inicio_busqueda +
        `/` +
        this.state.fecha_final_busqueda +
        `/` +
        local,
      requestOptionsTipoVentas
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Ventas tipo: ", data);
        
        this.setState({
          filter_ventas_tipo_pizzas:
            data.ventas_tipo.combinedUnicoAgrupadoArraySorted,
          filter_ventas_tipo_sabores:
            data.ventas_tipo.top10ConteoUnicoPizzaPastaLasagnaSaboresArray,
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
              <div style={{ width: "auto", marginRight: "0px" }}>
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
                    <div className="indicadorKPIVentasAux">
                      %{" "}
                      {(
                        (parseInt(item.valor_total) * 100) /
                        parseInt(this.state.ventas_totales)
                      ).toFixed(1)}
                    </div>
                    <div className="indicadorKPIVentasAux">
                      {parseInt(item.valor_total).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                );
              })}
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
                    sizeY={3}
                    row={0}
                    col={2}
                  ></PanelDirective>

                  <PanelDirective
                    header="Ventas totales"
                    content={this.graficaVentas.bind(this)}
                    sizeX={4}
                    sizeY={3}
                    row={0}
                    col={0}
                  ></PanelDirective>
                  <PanelDirective
                    header="Histograma horas"
                    content={this.histograma.bind(this)}
                    sizeX={6}
                    sizeY={2}
                    row={3}
                    col={0}
                  ></PanelDirective>
                  
                  <PanelDirective
                    header="Ventas tipos"
                    content={this.barrasPizzasVentas.bind(this)}
                    sizeX={3}
                    sizeY={3}
                    row={5}
                    col={0}
                  ></PanelDirective>
                 
                  <PanelDirective
                    header="Ventas sabores - TOP 10"
                    content={this.barrasPizzasVentasSabores.bind(this)}
                    sizeX={3}
                    sizeY={3}
                    row={5}
                    col={4}
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

  onChartLoadVentas() {
    let chart = document.getElementById("chartsVentas");
    chart.setAttribute("title", "");
  }

  onChartLoadHistograma() {
    let chart = document.getElementById("chartsHistograma");
    chart.setAttribute("title", "");
  }

  onChartLoadPie() {
    document.getElementById("pie-chart").setAttribute("title", "");
  }

  onChartLoadVentasPizzas() {
    document.getElementById("chart-pizzas").setAttribute("title", "");
  }

  onChartLoadVentasPizzasSabores() {
    document.getElementById("chart-pizzas-sabores").setAttribute("title", "");
  }

  onChartLoadPie2() {
    document.getElementById("pie-chart02").setAttribute("title", "");
  }

  load() {}
  loadVentasPizzas() {}
  loadVentasPizzasSabores() {}
  loadHistograma() {}
  loadVentas() {}

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
