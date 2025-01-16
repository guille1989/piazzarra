import React, { Component } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Inject,
  DetailRow,
} from "@syncfusion/ej2-react-grids";

class adminReviewVentasPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ventas: [],
      ventas_totales: [],
      ventas_review: [],
    };
    this.gridTemplate = this.gridTemplate.bind(this);
  }

  componentDidMount() {
    var date = new Date();
    var options = { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' };

    // Formatear la fecha de hoy
    var formatter = new Intl.DateTimeFormat('en-US', options);
    var [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(date);
    var today = `${year}-${month}-${day}`;

    // Establecer la fecha de hoy en el elemento con id "fechaHoyRInventario"
    document.getElementById("fechaHoyRInventario").value = today;

    // Obtener la fecha de ayer
    date.setDate(date.getDate() - 1);
    var [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(date);
    var today_ayer = `${year}-${month}-${day}`;

    //console.log(today);
    //console.log(today_ayer);

    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/pedidos/` +
        today +
        `/Cali-Refugio`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        if (data.inv.result_sum_ventas === 0) {
          console.log("No hay registro");
          this.setState({
            ventas: [],
            ventas_totales: [],
            ventas_review: [],
          });
        } else {
          //console.log(data);
          //console.log(data.inv.result_sum_ventas)
          console.log("Si hay registro");
          this.setState({
            ventas: data.inv.result,
            ventas_totales: data.inv.result_sum_ventas,
            ventas_review: data.inv.result_sum_tipo,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleFechaHoy(e) {
    // Cuadramos ayer
    //Revisar primero si hay inventario ya con la fecha !
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/pedidos/` +
        e.target.value +
        `/Cali-Refugio`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.inv)
        if (data.inv.result_sum_ventas === 0) {
          console.log("No hay registro");
          this.setState({
            ventas: [],
            ventas_totales: [],
            ventas_review: [],
          });
        } else {
          //console.log(data.inv.result[0].pedido)
          //console.log(data.inv.result_sum_ventas)
          //console.log(data);
          this.setState({
            ventas: data.inv.result,
            ventas_totales: data.inv.result_sum_ventas,
            ventas_review: data.inv.result_sum_tipo,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  gridTemplate(props) {
    let countItems = 0;
    if (props.tipo_pedido === "domicilios") {
      return (
        <div>
          <table
            className="tableReviewVentas"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  No.
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  ITEM
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  TIPO SABORES
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  HORA DOMICILIO
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  DIRECCIÓN DOMICILIO
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  COSTO DOMICILIO
                </th>
              </tr>
            </thead>
            {this.state.ventas.map((item, index) => {
              if (item.aux[0].tipo_pedido.toUpperCase().includes("DOMICILIO")) {
                //
                const matchingValuesSabor = item.pedido.flatMap((pedidoItem) =>
                  Object.keys(pedidoItem)
                    .filter(
                      (key) =>
                        key.includes("sabor") ||
                        key.includes("mitad") ||
                        key.includes("cuarto")
                    )
                    .map((key) => pedidoItem[key])
                );

                const saborValues = matchingValuesSabor.filter(
                  (value) => value !== ""
                );
                return (
                  <>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          {(countItems += 1)}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          {item.pedido.map((item, indexAux) => {
                            return (
                              <>
                                <span
                                  key={indexAux}
                                  style={{ marginRight: "8px" }}
                                >
                                  {item.tipo}
                                </span>
                              </>
                            );
                          })}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          {saborValues.map((sabor, index) => {
                            return (
                              <span key={index} style={{ marginRight: "8px" }}>
                                {sabor}
                              </span>
                            );
                          })}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          {this.state.ventas[index].aux[0].hora_pedido}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          {this.state.ventas[index].aux[0].domi_direccion}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          {parseInt(this.state.ventas[index].aux[0].domi_costo).toLocaleString('es-CO', {
                                      style: 'currency',
                                      currency: 'COP',
                                    })}
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              }
            })}
          </table>
        </div>
      );
    } else if (props.tipo_pedido === "TOTAL") {
      return <>Nada para mostrar</>;
    } else {
    }
    return (
      <>
        <table
          className="tableReviewVentas"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                No.
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                ITEM
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                TIPO PEDIDO
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                HORA PEDIDO
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                TIPO SABORES
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                COSTO
              </th>
            </tr>
          </thead>
          {this.state.ventas.map((item, index) => {
            return (
              <>
                {item.pedido.map((item, index2) => {
                  return (
                    <>
                      {(() => {
                        const observacionesPedido =
                          this.state.ventas[index].aux[0].observacion_pedido;
                        let tipoPedido = props.tipo_pedido
                          ?.split("_")[1]
                          ?.toUpperCase();
                        const tipoPedidoAux = props.tipo_pedido
                          ?.split("_")[2]
                          ?.toUpperCase();
                        const tipoPedidoAux2 = props.tipo_pedido
                          ?.split("_")[0]
                          ?.toUpperCase();
                       
                        if (item.tipo.includes("PASTA")) {
                          tipoPedido = "PASTA TIPO: " + tipoPedidoAux;
                        }
                        if (props.tipo_pedido.includes("limonada")) {
                          tipoPedido =
                            "JUGO " +
                            props.tipo_pedido.split("_")[0].toUpperCase();
                        }

                        let itemPedido = item.tipo.toUpperCase();

                        if (props.tipo_pedido.includes("sopa")) {
                          tipoPedido =
                            "SOPA" + "_" + tipoPedidoAux2.toUpperCase();
                          itemPedido = item.tipo + "_" + item.sabor_sopa;
                        }

                        if (props.tipo_pedido.includes("masa_personal_cinco")) {
                          tipoPedido = " MASAS PER.";

                        }

                        if (tipoPedido && itemPedido.includes(tipoPedido)) {
                          const matchingKeys = Object.keys(item).filter((key) =>
                            key.includes("costo")
                          );
                          const matchingValues = matchingKeys.map(
                            (key) => item[key]
                          );
                          const numericValues = matchingValues.filter(
                            (value) => !isNaN(value)
                          );
                          const totalCost = numericValues.reduce(
                            (acc, curr) => acc + Number(curr),
                            0
                          );

                          //
                          const matchingKeysSabor = Object.keys(item).filter(
                            (key) =>
                              key.includes("sabor") ||
                              key.includes("mitad") ||
                              key.includes("cuarto") ||
                              key.includes("desayuno_tipo")
                          );
                          const matchingValuesSabor = matchingKeysSabor.map(
                            (key) => item[key]
                          );
                          const saborValues = matchingValuesSabor.filter(
                            (value) => value !== ""
                          );
                          return (
                            <>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    {(countItems += 1)}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    {observacionesPedido
                                      ? `${item.tipo} - CORTESIA`
                                      : item.tipo}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    {
                                      this.state.ventas[index].aux[0]
                                        .tipo_pedido
                                    }
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    {
                                      this.state.ventas[index].aux[0]
                                        .hora_pedido
                                    }
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    {saborValues.map((sabor, index) => {
                                      return (
                                        <span
                                          key={index}
                                          style={{ marginRight: "8px" }}
                                        >
                                          {sabor}
                                        </span>
                                      );
                                    })}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    {totalCost.toLocaleString('es-CO', {
                                      style: 'currency',
                                      currency: 'COP',
                                    })}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        }
                      })()}
                    </>
                  );
                })}
              </>
            );
          })}
        </table>
      </>
    );
  }

  render() {
    const template = this.gridTemplate;
    return (
      <div className="contenedor">
        <br></br>
        <br></br>

        <h1>Revision ventas Cali: </h1>

        <h3>Paso No. 1: Seleccione fecha</h3>

        <hr className="border border-3 opacity-100"></hr>

        <input
          type="date"
          id="fechaHoyRInventario"
          onChange={this.handleFechaHoy.bind(this)}
          className="form-control p-3 g-col-6"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />

        <br></br>

        <h1>Ventas del dia: {this.state.ventas_totales}</h1>

        {/* Tabla de ventas 
        <table className="table">
          <tbody>
            <tr>
              <th>#</th>
              <th>ITEM</th>
              <th>TIPO PEDIDO</th>
              <th>SABORES</th>
              <th>COSTO</th>
            </tr>
            {this.state.ventas.map((item, index) => {
              return (
                <>
                  {item.pedido.map((item, index2) => {
                    return (
                      <>
                        <tr>
                          <th scope="row"></th>
                          <th>{item.tipo}</th>
                          <th>
                            {this.state.ventas[index].aux[0]
                              .observacion_pedido ? (
                              <>
                                {this.state.ventas[index].aux[0].tipo_pedido +
                                  " - Cortesia"}
                              </>
                            ) : (
                              <>{this.state.ventas[index].aux[0].tipo_pedido}</>
                            )}
                          </th>
                          {(() => {
                            if (item.tipo === "PIZZA GRANDE COMPLETA") {
                              return (
                                <>
                                  <td>
                                    {item.sabor_grande}
                                    {item.mod_sabor_grande}
                                  </td>
                                  <td>
                                    {item.costo_grande +
                                      item.costo_adiciones_grande}
                                  </td>
                                </>
                              );
                            } else if (
                              item.tipo === "PIZZA GRANDE COMPLETA PROMOCION"
                            ) {
                              return (
                                <>
                                  <td>
                                    {item.sabor_grande}
                                    {item.mod_sabor_grande}
                                  </td>
                                  <td>
                                    {item.costo_grande +
                                      item.costo_adiciones_grande}
                                  </td>
                                </>
                              );
                            } else if (
                              item.tipo === "PIZZA PERSONAL COMPLETA"
                            ) {
                              return (
                                <>
                                  <td>
                                    {item.sabor_personal}
                                    {item.mod_sabor_personal}
                                  </td>
                                  <td>
                                    {item.costo_personal + item.costo_adiciones}
                                  </td>
                                </>
                              );
                            } else if (
                              item.tipo === "PIZZA PERSONAL COMPLETA PROMOCION"
                            ) {
                              return (
                                <>
                                  <td>
                                    {item.sabor_personal}
                                    {item.mod_sabor_personal}
                                  </td>
                                  <td>
                                    {item.costo_personal + item.costo_adiciones}
                                  </td>
                                </>
                              );
                            } else if (
                              item.tipo.includes("PIZZA PERSONAL MITAD")
                            ) {
                              return (
                                <>
                                  <td>
                                    {item.mitad_uno}
                                    {item.mod_mitad_uno} <br></br>
                                    {item.mitad_dos}
                                    {item.mod_mitad_dos} <br></br>
                                  </td>
                                  <td>
                                    {item.costo_personal + item.costo_adiciones}
                                  </td>
                                </>
                              );
                            } else if (item.tipo === "PIZZA GRANDE CUARTO") {
                              return (
                                <>
                                  <td>
                                    {item.cuarto_uno}
                                    {item.mod_cuarto_uno} <br></br>
                                    {item.cuarto_dos}
                                    {item.mod_cuarto_dos} <br></br>
                                    {item.cuarto_tres}
                                    {item.mod_cuarto_tres} <br></br>
                                    {item.cuarto_cuatro}
                                    {item.mod_cuarto_cuatro}
                                  </td>
                                  <td>
                                    {item.costo_grande +
                                      item.costo_adiciones_grande}
                                  </td>
                                </>
                              );
                            } else if (
                              item.tipo === "PIZZA GRANDE CUARTO PROMOCION"
                            ) {
                              return (
                                <>
                                  <td>
                                    {item.cuarto_uno}
                                    {item.mod_cuarto_uno} <br></br>
                                    {item.cuarto_dos}
                                    {item.mod_cuarto_dos} <br></br>
                                    {item.cuarto_tres}
                                    {item.mod_cuarto_tres} <br></br>
                                    {item.cuarto_cuatro}
                                    {item.mod_cuarto_cuatro}
                                  </td>
                                  <td>
                                    {item.costo_grande +
                                      item.costo_adiciones_grande}
                                  </td>
                                </>
                              );
                            } else if (item.tipo === "PIZZA GRANDE MITAD") {
                              return (
                                <>
                                  <td>
                                    {item.mitad_uno}
                                    {item.mod_mitad_uno} <br></br>
                                    {item.mitad_dos}
                                    {item.mod_mitad_dos} <br></br>
                                  </td>
                                  <td>
                                    {item.costo_grande +
                                      item.costo_adiciones_grande}
                                  </td>
                                </>
                              );
                            } else if (
                              item.tipo === "PIZZA GRANDE MITAD PROMOCION"
                            ) {
                              return (
                                <>
                                  <td>
                                    {item.mitad_uno}
                                    {item.mod_mitad_uno} <br></br>
                                    {item.mitad_dos}
                                    {item.mod_mitad_dos} <br></br>
                                  </td>
                                  <td>
                                    {item.costo_grande +
                                      item.costo_adiciones_grande}
                                  </td>
                                </>
                              );
                            } else if (item.tipo === "PIZZA PANTALON") {
                              return (
                                <>
                                  <td>
                                    {item.sabor_pantalon}
                                    {item.mod_sabor_pantalon}
                                  </td>
                                  <td>
                                    {item.costo_pantalon +
                                      item.costo_adiciones_pantalon}
                                  </td>
                                </>
                              );
                            } else if (item.tipo === "PIZZA PANCOOK") {
                              return (
                                <>
                                  <td>
                                    {item.sabor_pancook}
                                    {item.mod_sabor_pancook}
                                  </td>
                                  <td>
                                    {item.costo_pancook +
                                      item.costo_adiciones_pancook}
                                  </td>
                                </>
                              );
                            } else if (item.tipo.includes("LASAGNA SALSA")) {
                              return (
                                <>
                                  <td>
                                    {item.sabor_lasagna}
                                    {item.mod_sabor_lasagna}
                                  </td>
                                  <td>
                                    {item.costo_lasagna +
                                      item.costo_adiciones_lasagna}
                                  </td>
                                </>
                              );
                            } else if (item.tipo.includes("RAVIOLI SALSA")) {
                              return (
                                <>
                                  <td>
                                    {item.sabor_ravioli + item.tipo}
                                    {item.mod_sabor_ravioli}
                                  </td>
                                  <td>
                                    {item.costo_ravioli +
                                      item.costo_adiciones_ravioli}
                                  </td>
                                </>
                              );
                            } else if (item.tipo.includes("PASTA")) {
                              return (
                                <>
                                  <td>
                                    {item.sabor_pasta}
                                    {item.mod_sabor_pasta}
                                  </td>
                                  <td>
                                    {item.costo_pasta +
                                      item.costo_adiciones_pasta}
                                  </td>
                                </>
                              );
                            } else if (item.tipo === "SOPA") {
                              return (
                                <>
                                  <td>
                                    {item.sabor_sopa}
                                    {item.mod_sabor_sopa}
                                  </td>
                                  <td>
                                    {item.costo_sopa +
                                      item.costo_adiciones_sopa}
                                  </td>
                                </>
                              );
                            } else if (item.tipo.includes("PAN AJO")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_pan_ajo}</td>
                                </>
                              );
                            } else if (item.tipo.includes("PAN 10")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_panaderia}</td>
                                </>
                              );
                            } else if (item.tipo.includes("PAN 20")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_panaderia}</td>
                                </>
                              );
                            } else if (item.tipo.includes("PAN COOK 2")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_panaderia}</td>
                                </>
                              );
                            } else if (item.tipo.includes("PAN UNIDAD")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_panaderia}</td>
                                </>
                              );
                            } else if (item.tipo.includes("AMERICANO")) {
                              return (
                                <>
                                  <td>
                                    {item.desayuno_tipo_bebida} <br />
                                    {item.desayuno_tipo_huevos}
                                    {item.mod_sabor_desayuno}
                                  </td>
                                  <td>
                                    {item.costo_desayuno_americano +
                                      item.costo_adiciones_americano}
                                  </td>
                                </>
                              );
                            } else if (item.tipo.includes("HUESPED")) {
                              return (
                                <>
                                  <td>
                                    {item.desayuno_tipo_bebida} <br />
                                    {item.desayuno_tipo_huevos}
                                    {item.mod_sabor_desayuno}
                                  </td>
                                  <td>
                                    {item.costo_desayuno_huesped +
                                      item.costo_adiciones_huesped}
                                  </td>
                                </>
                              );
                            } else if (item.tipo.includes("MASAS")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_panaderia}</td>
                                </>
                              );
                            } else if (item.tipo.includes("CAFÉ")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_cafe}
                                  </td>
                                  <td>{item.costo_tinto}</td>
                                </>
                              );
                            } else if (item.tipo.includes("CHOCOLATE")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_chocolate}
                                  </td>
                                  <td>{item.costo_chocolate}</td>
                                </>
                              );
                            } else if (item.tipo.includes("VINO")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_vino}</td>
                                </>
                              );
                            } else if (item.tipo.includes("JUGO")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_jugo}
                                  </td>
                                  <td>{item.costo_jugo}</td>
                                </>
                              );
                            } else if (item.tipo.includes("CERVEZA")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_cerveza}
                                  </td>
                                  <td>{item.costo_cerveza}</td>
                                </>
                              );
                            } else if (item.tipo.includes("GASEOSA")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_gaseosa}
                                  </td>
                                  <td>{item.costo_gaseosa}</td>
                                </>
                              );
                            } else if (item.tipo.includes("AGUA")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_bebida}
                                  </td>
                                  <td>{item.costo_bebida}</td>
                                </>
                              );
                            } else if (item.tipo.includes("AROMATICA")) {
                              return (
                                <>
                                  <td>
                                    {item.tipo}
                                    {item.mod_sabor_bebida}
                                  </td>
                                  <td>{item.costo_bebida}</td>
                                </>
                              );
                            } else if (item.tipo.includes("SALSA 16 ONZAS")) {
                              return (
                                <>
                                  <td>{item.tipo}</td>
                                  <td>{item.costo_otros}</td>
                                </>
                              );
                            } else {
                              return <div>Sin datos</div>;
                            }
                          })()}
                        </tr>
                      </>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
        */}
        <br></br>

        <h1>Resumen Ventas:</h1>

        <br></br>

        <div className="control-pane">
          <div className="control-section">
            <GridComponent
              dataSource={this.state.ventas_review}
              height="550"
              allowSorting={true}
              detailTemplate={template.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="tipo_pedido"
                  headerText="Tipo Pedido"
                  width="120"
                  textAlign="left"
                ></ColumnDirective>
                <ColumnDirective
                  field="No"
                  headerText="Numero"
                  width="150"
                ></ColumnDirective>
                <ColumnDirective
                  field="Costo"
                  headerText="Costo"
                  width="150"
                  format="C0"
                ></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[DetailRow, Sort]} />
            </GridComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default adminReviewVentasPC;
