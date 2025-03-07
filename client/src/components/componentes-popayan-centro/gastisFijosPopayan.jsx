import React, { Component } from "react";

class gastosFijosPopayan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NuevaCategoria: "",
      gastosCategoriasGenerales: [],
      gastosFijos: [],
      fechaRegistroInventario: "",
      hayFecha: false,
      NuevoGasto: "",
      filas: [
        {
          id: 1,
          descripcion: "ARRIENDO",
          category: "Infraestructura",
          monto: "",
        },
        { id: 2, descripcion: "NOMINA", category: "Personal", monto: "" },
        {
          id: 3,
          descripcion: "SERVICIOS",
          category: "Infraestructura",
          monto: "",
        },
      ],
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
    var today = year + "-" + month;
    document.getElementById("fechaHoyRInventario").value = today;
    this.setState({
      fechaRegistroInventario: today,
      hayFecha: true,
    });
    console.log("Inicio: ",today);

    //Treamos categorias de gastos fijos
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijoscategorias`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gastosCategoriasGenerales: data.inv });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijosresumen/` +
        `/` +
        getMonthName(today) +
        `/` +
        getYear(today) +
        `/` +
        `${process.env.REACT_APP_LOCAL_POPAYAN}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gastosFijos: data.inv });
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  handleFechaHoy(e) {
    //Revisar primero si hay inventario ya con la fecha !
    this.setState({
      fechaRegistroInventario: e.target.value,
      hayFecha: true,
    });

    console.log(e.target.value)

    //Traemos gastos fijos para el periodo seleccionado
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijosresumen/` +
        `/` +
        getMonthName(e.target.value) +
        `/` +
        getYear(e.target.value) +
        `/` +
        `${process.env.REACT_APP_LOCAL_POPAYAN}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gastosFijos: data.inv });
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  agregarFila = () => {
    if (this.state.NuevoGasto === "") {
      alert("Por favor digite un gasto fijo");
      return;
    } else {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que deseas crear nuevo gasto?"
      );
      if (confirmDelete) {
        this.setState((prevState) => ({
          filas: [
            ...prevState.filas,
            {
              id: prevState.filas.length + 1,
              descripcion: this.state.NuevoGasto,
              category: this.state.NuevaCategoria,
              monto: "",
            },
          ],
        }));
      }
    }
  };

  eliminarFila = (id) => {
    console.log(id);
    if (id > 0) {
      this.setState((prevState) => ({
        filas: prevState.filas.filter((fila) => fila.id !== id),
      }));
    }
  };

  eliminarGastoFila = (id, idElemento, descripcion) => {
    console.log(id, idElemento, descripcion);

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar el gasto fijo?"
    );
    if (confirmDelete) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      };
      fetch(
        `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijosresumen/` +
          id +
          `/` +
          idElemento +
          `/` +
          descripcion,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          //Traemos gastos fijos para el periodo seleccionado
          const requestOptionsAux = {
            method: "GET",
            headers: { "Content-type": "application/json" },
          };

          fetch(
            `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijosresumen/` +
              `/` +
              getMonthName(this.state.fechaRegistroInventario) +
              `/` +
              getYear(this.state.fechaRegistroInventario) +
              `/` +
              `${process.env.REACT_APP_LOCAL_POPAYAN}`,
            requestOptionsAux
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({ gastosFijos: data.inv });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  handleInputChange = (id, event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      filas: prevState.filas.map((fila) =>
        fila.id === id ? { ...fila, [name]: value } : fila
      ),
    }));
  };

  guardarGastosFijos = () => {
    const { filas } = this.state;
    for (let fila of filas) {
      if (!fila.monto || fila.monto <= 0) {
        alert("Por favor, complete todos los campos de monto.");
        return;
      }
    }
    const jsonData = JSON.stringify(filas);
    console.log(jsonData);
    const confirm = window.confirm(
      "¿Estás seguro de que deseas crear nuevo gasto?"
    );
    if (confirm) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: jsonData,
      };
      //Envio inventario final
      fetch(
        `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijoscategorias/` +
          process.env.REACT_APP_LOCAL_POPAYAN +
          `/` +
          getMonthName(this.state.fechaRegistroInventario) +
          `/` +
          getYear(this.state.fechaRegistroInventario),
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          const requestOptionsAux = {
            method: "GET",
            headers: { "Content-type": "application/json" },
          };

          fetch(
            `http://${process.env.REACT_APP_URL_PRODUCCION}/api/gastosfijosresumen/` +
              `/` +
              getMonthName(this.state.fechaRegistroInventario) +
              `/` +
              getYear(this.state.fechaRegistroInventario) +
              `/` +
              `${process.env.REACT_APP_LOCAL_POPAYAN}`,
            requestOptionsAux
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({ gastosFijos: data.inv });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    // Aquí puedes enviar el JSON a un servidor o guardarlo localmente
  };

  formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  // Función para manejar el cambio en el campo de entrada
  handleMontoChange = (id, event) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    this.setState((prevState) => ({
      filas: prevState.filas.map((fila) =>
        fila.id === id ? { ...fila, monto: numericValue } : fila
      ),
    }));
  };

  render() {
    return (
      <div className="contenedor">
        <br></br>
        <br></br>

        <h3>
          Gastos fijos {process.env.REACT_APP_LOCAL_POPAYAN}{" "}
          {getMonthName(this.state.fechaRegistroInventario)} -{" "}
          {getYear(this.state.fechaRegistroInventario)}
        </h3>

        <br></br>
        <hr className="border border-3 opacity-100"></hr>

        <h4>
          Seleccion del periodo para el registro de gastos fijos{" "}
        </h4>

        <input
          type="month"
          id="fechaHoyRInventario"
          onChange={this.handleFechaHoy.bind(this)}
          className="form-control p-3 g-col-6"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />

        <br></br>
        <hr className="border border-1 opacity-100"></hr>
        <br></br>

        <h4>
          Ingresar un nuevo registro de gastos fijos{" "}
        </h4>

        <div style={{ display: "flex" }}>
          <input
            id="gastosFijoNuevo"
            type="text"
            className="form-control w-50 mr-2"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Digite nueva descripcion fijo"
            onChange={(e) =>
              this.setState({ NuevoGasto: e.target.value.toUpperCase() })
            }
          />

          <select
            className="form-control w-50 mr-2"
            value={this.state.NuevaCategoria}
            onChange={(e) => this.setState({ NuevaCategoria: e.target.value })}
          >
            <option value="">Seleccione una categoría</option>
            {this.state.gastosCategoriasGenerales.map((categoria) => (
              <option key={categoria._id} value={categoria.category}>
                {categoria.category}
              </option>
            ))}
          </select>

          <button
            style={{ marginLeft: "10px" }}
            type="button"
            onClick={this.agregarFila}
            className="btn btn-primary"
          >
            Agregar nuevo gasto
          </button>
        </div>

        <br></br>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>DESCRIPCIÓN</th>
                <th>CATEGORIA</th>
                <th>DESCRIPCION CATEGORIA</th>
                <th>MONTO</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filas.map((fila, index) => {
                const categoria = this.state.gastosCategoriasGenerales.find(
                  (cat) => cat.category === fila.category
                );
                return (
                  <tr key={fila.id} className="table-row">
                    <td>
                      <label className="form-control">{fila.descripcion}</label>
                    </td>
                    <td>
                      <label className="form-control">{fila.category}</label>
                    </td>
                    <td>
                      <label className="form-control table-cell">
                        {categoria ? categoria.expenses.join(", ") : ""}
                      </label>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="monto"
                        value={fila.monto}
                        onChange={(e) => this.handleInputChange(fila.id, e)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      {index >= 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => this.eliminarFila(fila.id)}
                            className="btn btn-danger"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <br></br>

        <button
          style={{ height: "50px", fontSize: "20px" }}
          type="button"
          onClick={this.guardarGastosFijos}
          className="btn btn-warning w-100 mt-3"
        >
          Guardar Gastos Fijos
        </button>

        <br></br>
        <br></br>
        <hr className="border border-3 opacity-100"></hr>

        <h3>
          Gastos fijo registrados periodo{" "}
          {getMonthName(this.state.fechaRegistroInventario)} -{" "}
          {getYear(this.state.fechaRegistroInventario)}
        </h3>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>DESCRIPCIÓN</th>
                <th>CATEGORIA</th>
                <th>DESCRIPCION CATEGORIA</th>
                <th>MONTO</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.gastosFijos.map((fila, index) =>
                fila.GASTOS.map((gastos, subIndex) => {
                  console.log(fila);
                  const categoria = this.state.gastosCategoriasGenerales.find(
                    (cat) => cat.category === gastos.category
                  );
                  console.log(gastos);
                  return (
                    <tr key={`${index}-${subIndex}`} className="table-row">
                      <td>
                        <label className="form-control">
                          {gastos.descripcion}
                        </label>
                      </td>
                      <td>
                        <label className="form-control">
                          {gastos.category}
                        </label>
                      </td>
                      <td>
                        <label
                          style={{ width: "250px" }}
                          className="form-control table-cell"
                        >
                          {categoria ? categoria.expenses.join(", ") : ""}
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="monto"
                          value={this.formatCurrency(gastos.monto)}
                          onChange={(e) => this.handleMontoChange(gastos.id, e)}
                          onBlur={(e) => this.handleMontoChange(gastos.id, e)} // Formatea el valor al perder el foco
                          className="form-control"
                        />
                      </td>
                      <td>
                        {index >= 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                this.eliminarGastoFila(
                                  this.state.gastosFijos[index]._id,
                                  gastos.id,
                                  gastos.descripcion
                                )
                              }
                              className="btn btn-warning"
                            >
                              Elimnar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function getMonthName(dateString) {
  const [year, month] = dateString.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  //console.log("getMonthName: ",dateString, month, monthIndex, monthNames[monthIndex])
  return monthNames[monthIndex];
}

function getYear(dateString) {
  const [year] = dateString.split("-");
  return parseInt(year, 10);
}

export default gastosFijosPopayan;
