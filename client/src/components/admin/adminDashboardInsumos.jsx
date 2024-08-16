import React, { Component } from "react";

//Componentes
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import GraficaBarrasInsumos from "../componentsaux/graficaBarrasResumenInsumos";
import Default from "../componentsaux/graficaResumenConsumoInsumos";
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

class adminDashboardInsumos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha_inicio_busqueda: "",
      fecha_final_busqueda: "",
      arrayInsumos: [],
    };

    this.toolbarOptions = ["Search"];
  }

  componentDidMount() {
    console.log("Componente de adminDashboardInsumos Listo");
    const today = new Date().toISOString().split("T")[0];
    console.log("Fecha de hoy: " + today);

    const dayOne = new Date();
    const firstDayOfMonth = new Date(
      dayOne.getFullYear(),
      dayOne.getMonth(),
      2
    );
    console.log(
      "Primer día del mes: " + firstDayOfMonth.toISOString().split("T")[0]
    );

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

    console.log("Fecha inicio: " + e.target.value);
    this.setState({
      fecha_inicio_busqueda: e.target.value,
    });
  }

  handleFechaFinal(e) {
    //Configuramos hoy
    console.log("Fecha final: " + e.target.value);
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
    console.log("Fecha inicio: " + this.state.fecha_inicio_busqueda);
    console.log("Fecha final: " + this.state.fecha_final_busqueda);

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

  render() {
    return (
      <div style={{ height: "100vh" }}>
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
        <div style={{ display: "flex" }}>
          {this.state.arrayInsumos?.inv?.map((insumo, index) => {
            if (insumo.result?.length > 0) {
              return (
                <div key={index} style={{ padding: "10px", height: "250px" }}>
                  {insumo.result.map((item, index) => {
                    let cssClassStyleChipOnInCuadre = parseInt(item.INV_CUADRE) < 0 ? "e-danger" : (parseInt(item.INV_CUADRE) === 0 ? "e-success" : "e-warning");
                    let invCuadreParsed = parseInt(item.INV_CUADRE, 10);
                    let stringTorender = item.TIPO + ":  " + invCuadreParsed;
                    return (
                      <ChipListComponent
                          id="chip-default"
                          aria-labelledby="chips"
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
        <br></br>
      </div>
    );
  }
}

export default adminDashboardInsumos;
