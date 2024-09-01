import React, { Component } from "react";
import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  DateTime,
  Tooltip,
  Highlight,
  StackingLineSeries,
  Category,
  Crosshair,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import {
  DashboardLayoutComponent,
  PanelsDirective,
  PanelDirective,
} from "@syncfusion/ej2-react-layouts";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import "../../App.css";

class adminSeguimientoCostos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costo_pizza_personal: "",
      costo_pizza_grande: "",
      costo_pizza_pantalon: "",
      costo_pizza_pancook: "",
      costo_lasagna_napolitana: "",
      costo_lasagna_queso: "",
      costo_spaguetti_napolitana: "",
      costo_spaguetti_queso: "",
      costo_fetuccini_napolitana: "",
      costo_fetuccini_queso: "",
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
    };
  }

  componentDidMount() {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };

    //Traemos Costos
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
          costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
          costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
          costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
          costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
          costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
          costo_spaguetti_napolitana: data.info.resultCostoProductos[6].COSTO,
          costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
          costo_fetuccini_napolitana: data.info.resultCostoProductos[8].COSTO,
          costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
          data_costos_personal: data.info.costoPizzaPersonalAux,
          data_costos_mediana: data.info.costoPizzaGrandeAux,
          data_costo_pantalon: data.info.costoPizzaPantalonAux,
          data_costo_pancook: data.info.costoPizzaPacookAux,
          data_costo_lasagna_napolitana:
            data.info.costoPizzaLasagnaNapolitanaAux,
          data_costo_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
          data_costo_sapguetti_napolitana:
            data.info.costoPizzaSpaguettiNapolitanaAux,
          data_costo_fetuccini_napolitana:
            data.info.costoPizzaFetucciniNapolitanaAux,
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
          data_costo_desayuno_aromatica: data.info.costoDesayunoAromatica,
        });
      });
  }

  //
  handleCostoPizzaPersonal(item, e) {
    //console.log(e.value)

    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_pizza_personal: data.info.resultCostoProductos[0].COSTO,
              data_costos_personal: data.info.costoPizzaPersonalAux,
            });
          });
      });
  }

  handleCostoPizzaGrande(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_pizza_grande: data.info.resultCostoProductos[1].COSTO,
              data_costos_mediana: data.info.costoPizzaGrandeAux,
            });
          });
      });
  }

  handleCostoPizzaPantalon(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_pizza_pantalon: data.info.resultCostoProductos[2].COSTO,
              data_costo_pantalon: data.info.costoPizzaPantalonAux,
            });
          });
      });
  }

  handleCostoPizzaPancook(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_pizza_pancook: data.info.resultCostoProductos[3].COSTO,
              data_costo_pancook: data.info.costoPizzaPacookAux,
            });
          });
      });
  }

  handleCostoLasagnaNapolitana(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_lasagna_napolitana: data.info.resultCostoProductos[4].COSTO,
                data_costo_lasagna_napolitana:
                    data.info.costoPizzaLasagnaNapolitanaAux,
            });
          });
      });
  }

  handleCostoLasagnaQueso(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_lasagna_queso: data.info.resultCostoProductos[5].COSTO,
                data_costo_lasagna_queso: data.info.costoPizzaLasagnaQuesoAux,
            });
          });
      });
  }

  handleCostoSpaguettiNapolitana(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_spaguetti_napolitana:
                data.info.resultCostoProductos[6].COSTO,
                data_costo_sapguetti_napolitana:
                    data.info.costoPizzaSpaguettiNapolitanaAux,
            });
          });
      });
  }

  handleCostoSpaguettiQueso(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_spaguetti_queso: data.info.resultCostoProductos[7].COSTO,
                data_costo_sapguetti_queso: data.info.costoPizzaSpaguettiQuesoAux,
            });
          });
      });
  }

  handleCostoFetucciniNapolitana(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_fetuccini_napolitana:
                data.info.resultCostoProductos[8].COSTO,
                data_costo_fetuccini_napolitana:
                    data.info.costoPizzaFetucciniNapolitanaAux
            });
          });
      });
  }

  handleCostoFetucciniQueso(item, e) {
    //Hacemos el ajuste del precio
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ TIPO: item, COSTO: e.value }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/actualizarcostoproductos`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchOptions2 = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        //Traemos Costos
        fetch(
          `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/costoproductos`,
          fetchOptions2
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              costo_fetuccini_queso: data.info.resultCostoProductos[9].COSTO,
                data_costo_fetuccini_queso: data.info.costoPizzaFetucciniQuesoAux
            });
          });
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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <h4>Pizza Personal Costo: </h4>
                <NumericTextBoxComponent
                  step={100}
                  value={this.state.costo_pizza_personal}
                  change={(e) =>
                    this.handleCostoPizzaPersonal("PIZZA_PERSONAL_COMPLETA", e)
                  }
                ></NumericTextBoxComponent>
            </div>
            {/* Chips 
            <div className="chip-container">
              {this.state.data_costos_personal.map((item, index) => {
                  let chipColor = "e-success";
                  if (parseInt(item.PORCENTAJE_DE_INSUMOS) >= 25 && parseInt(item.PORCENTAJE_DE_INSUMOS) <= 30) {
                      chipColor = "e-warning";
                  } else if (parseInt(item.PORCENTAJE_DE_INSUMOS) > 30) {
                      chipColor = "e-danger";
                  }
                  return <ChipListComponent id="chip-default" aria-labelledby="chips" key={index}>
                      <ChipsDirective>
                          <ChipDirective text={item.SABOR_PRODUCTO + " - " + item.PORCENTAJE_DE_INSUMOS + " %"} cssClass={chipColor}></ChipDirective>
                      </ChipsDirective>
                  </ChipListComponent>
              })}
            </div>
            */}
          </div>
          <div>
            <h4>Pizza Grande Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_pizza_grande}
              change={(e) =>
                this.handleCostoPizzaGrande("PIZZA_GRANDE_COMPLETA", e)
              }
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Pizza Pantalon Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_pizza_pantalon}
              change={(e) => this.handleCostoPizzaPantalon("PIZZA_PANTALON", e)}
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Pizza Pancook Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_pizza_pancook}
              change={(e) => this.handleCostoPizzaPancook("PIZZA_PANCOOK", e)}
            ></NumericTextBoxComponent>
          </div>
        </div>

        <div style={{ marginTop: "25px", width: "70%"}}>
          <ChartComponent
            id="charts"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              majorGridLines: { width: 0 },
              minorGridLines: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
              interval: 1,
              lineStyle: { width: 0 },
              valueType: "Category",
            }}
            primaryYAxis={{
              title: "Costo Producto",
              lineStyle: { width: 0 },
              minimum: 0,
              maximum: 20000,
              interval: 5000,
              majorTickLines: { width: 0 },
              majorGridLines: { width: 1 },
              minorGridLines: { width: 1 },
              minorTickLines: { width: 0 },
              labelFormat: "${value}",
            }}
            legendSettings={{ enableHighlight: true }}
            width={Browser.isDevice ? "100%" : "95%"}
            chartArea={{ border: { width: 0 } }}
            load={this.load.bind(this)}
            crosshair={{ enable: true, lineType: "Vertical" }}
            tooltip={tooltip}
          >
            <Inject
              services={[
                LineSeries,
                Category,
                Legend,
                Tooltip,
                Highlight,
                Crosshair,
              ]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={this.state.data_costos_personal}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Pizza Personal"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.data_costos_mediana}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Pizza Grande"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.data_costo_pantalon}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Pizza Pantalon"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.data_costo_pancook}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Pizza Pancook"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }

  graficaCostosLP() {
    const tooltip2 = {
      enable: true,
      header: "Costo Producto",
      shared: true,
      format:
        "Costo : <b>${point.y}</b><br/>% Costo Insumos : <b>${point.size}%</b>",
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div>
            <h4>Lasagna Salsa Napolitana Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_lasagna_napolitana}
              change={(e) =>
                this.handleCostoLasagnaNapolitana("PIZZA_LASAGNA_NAPOLITANA", e)
              }
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Lasagna Salsa Queso Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_lasagna_queso}
              change={(e) =>
                this.handleCostoLasagnaQueso("PIZZA_LASAGNA_QUESO", e)
              }
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Spaguetti Napolitana Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_spaguetti_napolitana}
              change={(e) =>
                this.handleCostoSpaguettiNapolitana(
                  "PIZZA_PASTA_SPAGUETTI_NAPOLITANA",
                  e
                )
              }
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Spaguetti Queso Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_spaguetti_queso}
              change={(e) =>
                this.handleCostoSpaguettiQueso("PIZZA_PASTA_SPAGUETTI_QUESO", e)
              }
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Fetuccini Napolitana Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_fetuccini_napolitana}
              change={(e) =>
                this.handleCostoFetucciniNapolitana(
                  "PIZZA_PASTA_FETUCCINI_NAPOLITANA",
                  e
                )
              }
            ></NumericTextBoxComponent>
          </div>
          <div>
            <h4>Fetuccini Queso Costo: </h4>
            <NumericTextBoxComponent
              step={100}
              value={this.state.costo_fetuccini_queso}
              change={(e) =>
                this.handleCostoFetucciniQueso("PIZZA_PASTA_FETUCCINI_QUESO", e)
              }
            ></NumericTextBoxComponent>
          </div>
        </div>

        <div style={{ marginTop: "25px", width: "70%" }}>
          <ChartComponent
            id="charts2"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              majorGridLines: { width: 0 },
              minorGridLines: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
              interval: 1,
              lineStyle: { width: 0 },
              valueType: "Category",
            }}
            primaryYAxis={{
              title: "Costo Producto",
              lineStyle: { width: 0 },
              minimum: 0,
              maximum: 25000,
              interval: 5000,
              majorTickLines: { width: 0 },
              majorGridLines: { width: 1 },
              minorGridLines: { width: 1 },
              minorTickLines: { width: 0 },
              labelFormat: "${value}",
            }}
            legendSettings={{ enableHighlight: true }}
            width={Browser.isDevice ? "100%" : "95%"}
            chartArea={{ border: { width: 0 } }}
            load={this.load2.bind(this)}
            crosshair={{ enable: true, lineType: "Vertical" }}
            tooltip={tooltip2}
          >
            <Inject
              services={[
                LineSeries,
                Category,
                Legend,
                Tooltip,
                Highlight,
                Crosshair,
              ]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={this.state.data_costo_lasagna_napolitana}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Lasagna S-Napolitana"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.data_costo_lasagna_queso}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Lasagna S-Queso"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>

              <SeriesDirective
                dataSource={this.state.data_costo_sapguetti_napolitana}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Spaguetti S-Napolitana"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.data_costo_fetuccini_napolitana}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Fetuccini S-Napolitana"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>

              <SeriesDirective
                dataSource={this.state.data_costo_sapguetti_queso}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Spaguetti S-Queso"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.data_costo_fetuccini_queso}
                xName="SABOR_PRODUCTO"
                yName="COSTO_PRODUCTO"
                name="Fetuccini S-Queso"
                size="PORCENTAJE_DE_INSUMOS"
                width={2}
                type="Line"
                marker={{
                  isFilled: true,
                  visible: true,
                  shape: "Circle",
                  width: 7,
                  height: 7,
                }}
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }

  graficaCostosD() {
    const tooltip3 = {
      enable: true,
      header: "Costo Producto",
      shared: true,
      format:
        "Costo : <b>${point.y}</b><br/>% Costo Insumos : <b>${point.size}%</b>",
    };
    return (
      <div style={{ marginTop: "15px" }}>
        <ChartComponent
          id="charts3"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            majorGridLines: { width: 0 },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            interval: 1,
            lineStyle: { width: 0 },
            valueType: "Category",
          }}
          primaryYAxis={{
            title: "Costo Producto",
            lineStyle: { width: 0 },
            minimum: 0,
            maximum: 25000,
            interval: 5000,
            majorTickLines: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 0 },
            labelFormat: "${value}",
          }}
          legendSettings={{ enableHighlight: true }}
          width={Browser.isDevice ? "100%" : "95%"}
          chartArea={{ border: { width: 0 } }}
          load={this.load3.bind(this)}
          crosshair={{ enable: true, lineType: "Vertical" }}
          tooltip={tooltip3}
        >
          <Inject
            services={[
              LineSeries,
              Category,
              Legend,
              Tooltip,
              Highlight,
              Crosshair,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={this.state.data_costo_desayuno_cafe}
              xName="SABOR_PRODUCTO"
              yName="COSTO_PRODUCTO"
              name="Desayuno-Cafe"
              size="PORCENTAJE_DE_INSUMOS"
              width={2}
              type="Line"
              marker={{
                isFilled: true,
                visible: true,
                shape: "Circle",
                width: 7,
                height: 7,
              }}
            ></SeriesDirective>

            <SeriesDirective
              dataSource={this.state.data_costo_desayuno_chocolate}
              xName="SABOR_PRODUCTO"
              yName="COSTO_PRODUCTO"
              name="Desayuno-Chocolate"
              size="PORCENTAJE_DE_INSUMOS"
              width={2}
              type="Line"
              marker={{
                isFilled: true,
                visible: true,
                shape: "Circle",
                width: 7,
                height: 7,
              }}
            ></SeriesDirective>

            <SeriesDirective
              dataSource={this.state.data_costo_desayuno_aromatica}
              xName="SABOR_PRODUCTO"
              yName="COSTO_PRODUCTO"
              name="Desayuno-Aromatica"
              size="PORCENTAJE_DE_INSUMOS"
              width={2}
              type="Line"
              marker={{
                isFilled: true,
                visible: true,
                shape: "Circle",
                width: 7,
                height: 7,
              }}
            ></SeriesDirective>

            <SeriesDirective
              dataSource={this.state.data_costo_desayuno_te}
              xName="SABOR_PRODUCTO"
              yName="COSTO_PRODUCTO"
              name="Desayuno-Te"
              size="PORCENTAJE_DE_INSUMOS"
              width={2}
              type="Line"
              marker={{
                isFilled: true,
                visible: true,
                shape: "Circle",
                width: 7,
                height: 7,
              }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }

  tablaCostosPPP() {
    return (
      <div className="control-pane">
        <div className="control-section row">
          <GridComponent
            allowSorting={true}
            dataSource={this.state.data_tabla_One}
            allowPaging={true}
            pageSettings={{ pageSize: 10, pageCount: 5 }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="SABOR_PRODUCTO"
                headerText="Sabor"
                width="150"
              ></ColumnDirective>
              <ColumnDirective
                field="COSTO_PRODUCTO"
                headerText="Costo Insumos"
                width="90"
              ></ColumnDirective>
              <ColumnDirective
                field="COSTO_PRODUCTO_VENTA"
                headerText="Costo Venta"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="PORCENTAJE_DE_INSUMOS"
                headerText="% Costo Venta"
                width="90"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Toolbar, Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }

  headerPrimeraTable() {
    return (
      <div style={{ display: "flex" }}>
        <select
          class="w-50"
          value={this.state.valor_table_one}
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "1") {
              this.setState({
                data_tabla_One: this.state.data_costos_personal,
                valor_table_one: 1,
              });
            } else if (e.target.value === "2") {
              this.setState({
                data_tabla_One: this.state.data_costos_mediana,
                valor_table_one: 2,
              });
            } else if (e.target.value === "3") {
              this.setState({
                data_tabla_One: this.state.data_costo_pantalon,
                valor_table_one: 3,
              });
            } else if (e.target.value === "4") {
              this.setState({
                data_tabla_One: this.state.data_costo_pancook,
                valor_table_one: 4,
              });
            }
          }}
        >
          <option selected>Seleccione Tipo de Producto</option>
          <option value="1">Pizza Personal</option>
          <option value="2">Pizza Grande</option>
          <option value="3">Pizza Pantalin</option>
          <option value="4">Pizza Pancook</option>
        </select>
      </div>
    );
  }

  tablaCostosLP() {
    return (
      <div className="control-pane">
        <div className="control-section row">
          <GridComponent
            allowSorting={true}
            dataSource={this.state.data_tabla_Two}
            allowPaging={true}
            pageSettings={{ pageSize: 10, pageCount: 5 }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="SABOR_PRODUCTO"
                headerText="Sabor"
                width="150"
              ></ColumnDirective>
              <ColumnDirective
                field="COSTO_PRODUCTO"
                headerText="Costo Insumos"
                width="90"
              ></ColumnDirective>
              <ColumnDirective
                field="COSTO_PRODUCTO_VENTA"
                headerText="Costo Venta"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="PORCENTAJE_DE_INSUMOS"
                headerText="% Costo Venta"
                width="90"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Toolbar, Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }

  tablaCostosD() {
    return (
      <div className="control-pane">
        <div className="control-section row">
          <GridComponent
            allowSorting={true}
            dataSource={this.state.data_tabla_Tree}
            allowPaging={true}
            pageSettings={{ pageSize: 10, pageCount: 5 }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="SABOR_PRODUCTO"
                headerText="Sabor"
                width="150"
              ></ColumnDirective>
              <ColumnDirective
                field="COSTO_PRODUCTO"
                headerText="Costo Insumos"
                width="90"
              ></ColumnDirective>
              <ColumnDirective
                field="COSTO_PRODUCTO_VENTA"
                headerText="Costo Venta"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="PORCENTAJE_DE_INSUMOS"
                headerText="% Costo Venta"
                width="90"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Toolbar, Page, Sort]} />
          </GridComponent>
        </div>
      </div>
    );
  }

  headerTerceraTable() {
    return (
      <div style={{ display: "flex" }}>
        <select
          class="w-50"
          value={this.state.valor_table_tree}
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "1") {
              this.setState({
                data_tabla_Tree: this.state.data_costo_desayuno_cafe,
                valor_table_tree: 1,
              });
            } else if (e.target.value === "2") {
              this.setState({
                data_tabla_Tree: this.state.data_costo_desayuno_chocolate,
                valor_table_tree: 2,
              });
            } else if (e.target.value === "3") {
              this.setState({
                data_tabla_Tree: this.state.data_costo_desayuno_aromatica,
                valor_table_tree: 3,
              });
            } else if (e.target.value === "4") {
              this.setState({
                data_tabla_Tree: this.state.data_costo_desayuno_te,
                valor_table_tree: 4,
              });
            }
          }}
        >
          <option selected>Seleccione Tipo de Producto</option>
          <option value="1">Desayuno Cafe</option>
          <option value="2">Desayuno Chocolate</option>
          <option value="3">Desayuno Aromatica</option>
          <option value="4">Desayuno Te</option>
        </select>
      </div>
    );
  }

  headerSegundaTable() {
    return (
      <div style={{ display: "flex" }}>
        <select
          class="w-50"
          value={this.state.valor_table_two}
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "1") {
              this.setState({
                data_tabla_Two: this.state.data_costo_lasagna_napolitana,
                valor_table_two: 1,
              });
            } else if (e.target.value === "2") {
              this.setState({
                data_tabla_Two: this.state.data_costo_lasagna_queso,
                valor_table_two: 2,
              });
            } else if (e.target.value === "3") {
              this.setState({
                data_tabla_Two: this.state.data_costo_sapguetti_napolitana,
                valor_table_two: 3,
              });
            } else if (e.target.value === "4") {
              this.setState({
                data_tabla_Two: this.state.data_costo_sapguetti_queso,
                valor_table_two: 4,
              });
            } else if (e.target.value === "5") {
              this.setState({
                data_tabla_Two: this.state.data_costo_fetuccini_napolitana,
                valor_table_two: 4,
              });
            } else if (e.target.value === "6") {
              this.setState({
                data_tabla_Two: this.state.data_costo_fetuccini_queso,
                valor_table_two: 4,
              });
            }
          }}
        >
          <option selected>Seleccione Tipo de Producto</option>
          <option value="1">Pizza Lasagna-Napolitana</option>
          <option value="2">Pizza Lasagna-Queso</option>
          <option value="3">Pizza Pasta-Spaguetti-Napolitana</option>
          <option value="4">Pizza Pasta-Spaguetti-Queso</option>
          <option value="5">Pizza Pasta-Fetuccini-Napolitana</option>
          <option value="6">Pizza Pasta-Fetuccini-Queso</option>
        </select>
      </div>
    );
  }

  render() {
    let headertext;
    // Mapping Tab items Header property
    headertext = [
      { text: "PIZZAS, PANTALON y PANCOOK" },
      { text: "LASAGNAS y PASTAS" },
      { text: "DESAYUNOS" },
    ];
    return (
      <div className="contenedor">
        <br></br>
        <br></br>

        <h1>Seguimiento Costos de Produccion: </h1>

        <hr className="border border-3 opacity-100"></hr>

        <div className="control-pane">
          <div className="control-section tab-control-section">
            {/* Render the Tab Component */}
            <TabComponent id="defaultTab">
              <TabItemsDirective>
                <TabItemDirective
                  header={headertext[0]}
                  content={this.graficaCostos.bind(this)}
                />

                <TabItemDirective
                  header={headertext[1]}
                  content={this.graficaCostosLP.bind(this)}
                />

                <TabItemDirective
                  header={headertext[2]}
                  content={this.graficaCostosD.bind(this)}
                />
              </TabItemsDirective>
            </TabComponent>
          </div>
        </div>
      </div>
    );
  }

  onChartLoad(args) {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  }
  load(args) {}
  onChartLoad2(args) {
    let chart = document.getElementById("charts2");
    chart.setAttribute("title", "");
  }
  load2(args) {}
  onChartLoad3(args) {
    let chart = document.getElementById("charts3");
    chart.setAttribute("title", "");
  }
  load3(args) {}
}

export default adminSeguimientoCostos;
