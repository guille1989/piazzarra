import React, { Component } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";

class AdminSeguimientoRecetas extends Component {
  //
  dialogInstance;
  buttons;
  buttonEle;
  buttonRef;

  constructor(props) {
    super(props);
    this.state = {
      recetas: [],
      tiposProducto: [],
      insumosRecetaProducto: [],
      insumosOpcion: [],
      tipoProductoSeleccionado: "",
      tiposSaborProductos: ["Selecciona primero tipo de producto"],
      dataLoaded: false,
      hideDialog: false,
      insumosSeleccionados: [],
      selectedTipoSabor: "",
    };

    this.buttons = [
      {
        // Click the footer buttons to hide the Dialog
        click: () => {
          this.actualizarReceta();
        },
        // Accessing button component properties by buttonModel property
        buttonModel: {
          //Enables the primary button
          isPrimary: true,
          content: "Agregar nuevos insumos",
        },
      },
    ];

    this.buttonRef = (element) => {
      this.buttonEle = element;
    };
  }

  actualizarReceta() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.insumosRecetaProducto[1],
        datos_actualizar: this.state.insumosSeleccionados,
        tipo_producto: this.state.tipoProductoSeleccionado,
        tipo_actualizacion: "agregarNuevoInsumo",
      }),
    };
    
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimientorecetas`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ insumosSeleccionados: [],  recetas: data });

        this.obtenerInsumosDeProductoPorSabor(
          data,
          this.state.tipoProductoSeleccionado,
          this.state.selectedTipoSabor
        );
      })
      .catch((err) => console.log(err));
        

    this.dialogInstance.hide();
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimientorecetas`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const tiposDeProducto = this.obtenerTiposDeProducto(data);
        this.setState({
          recetas: data,
          dataLoaded: true,
          tiposProducto: tiposDeProducto,
        });
      })
      .catch((err) => console.log(err));

    const requestOptionsInsumos = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/insumos`,
      requestOptionsInsumos
    )
      .then((response) => response.json())
      .then((data) => {
        data.inv.sort((a, b) => a.TIPO.localeCompare(b.TIPO));
        this.setState({
          insumosOpcion: data.inv,
        });
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = (event, key) => {
    const newRecetas = [...this.state.insumosRecetaProducto];
    newRecetas[0][key] = parseInt(event.target.value);
    this.setState({ insumosRecetaProducto: newRecetas });
  };

  handleUpdateInsumos = () => {
    this.setState({ hideDialog: true });
  };

  dialogClose() {
    this.setState({ hideDialog: false });
    this.buttonEle.style.display = "inline-block";
  }

  dialogOpen() {
    this.buttonEle.style.display = "none";
  }

  handleUpdateRecete = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.insumosRecetaProducto[1],
        datos_actualizar: this.state.insumosRecetaProducto[0],
        tipo_producto: this.state.tipoProductoSeleccionado,
        tipo_actualizacion: "actualizarReceta",
      }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimientorecetas`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "Ok") {
          alert("Receta actualizada");
        }
      })
      .catch((err) => console.log(err));
  };

  // Función para extraer todos los tipos de tipo_producto
  obtenerTiposDeProducto(data) {
    const tiposDeProducto = new Set();

    data.forEach((item) => {
      item.DATOS.forEach((dato) => {
        tiposDeProducto.add(dato.tipo_producto);
      });
    });
    return Array.from(tiposDeProducto);
  }

  obtenerTiposSaborPorProducto(data, tipoProducto) {
    const tiposSabor = new Set();

    data.forEach((item) => {
      item.DATOS.forEach((dato) => {
        if (dato.tipo_producto === tipoProducto) {
          tiposSabor.add(item.TIPO_SABOR);
        }
      });
    });

    return Array.from(tiposSabor);
  }

  obtenerInsumosDeProductoPorSabor(data, tipoProducto, tipoSabor) {
    let insumos = [];
    data.forEach((item) => {
      item.DATOS.forEach((dato) => {
        if (
          dato.tipo_producto === tipoProducto &&
          item.TIPO_SABOR === tipoSabor
        ) {
          insumos.push(dato);
          insumos.push(item._id);
        }
      });
    });

    this.setState({ insumosRecetaProducto: insumos });
  }

  handleSelectChange = (event) => {
    const tiposSaborFiltrados = this.obtenerTiposSaborPorProducto(
      this.state.recetas,
      event.target.value
    );
    document.getElementById("tipoSaborSelect").selectedIndex = 0;
    this.setState({
      tiposSaborProductos: tiposSaborFiltrados,
      tipoProductoSeleccionado: event.target.value,
      insumosRecetaProducto: [],
    });
  };

  handleSelectChangeTipoSabor = (event) => {
    this.setState({ selectedTipoSabor: event.target.value });
    this.obtenerInsumosDeProductoPorSabor(
      this.state.recetas,
      this.state.tipoProductoSeleccionado,
      event.target.value
    );
  };

  handleCheckChange(event, insumo) {

    let insumosSeleccionadosAux = this.state.insumosSeleccionados;
    if (event.checked) {
      insumosSeleccionadosAux.push(insumo.TIPO);
    } else {
      insumosSeleccionadosAux = insumosSeleccionadosAux.filter(
        (item) => item !== insumo.TIPO
      );
    }

    this.setState({ insumosSeleccionados: insumosSeleccionadosAux });
  }

  contenidoModal() {
    //Hacer fetch de insumos
    return (
      <div>
        {this.state.insumosOpcion.map((insumo, index) => (
          <div key={index}>
            <CheckBoxComponent
              label={insumo.TIPO}
              checked={false}
              change={(event) => this.handleCheckChange(event, insumo)}
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (!this.state.dataLoaded) {
      return <div>Cargando datos...</div>;
    }

    return (
      <div id="target">
        <div>
          <div style={{ display: "flex" }}>
            <h4 style={{ width: "250px" }}>
              Paso 1: seleccion tipo de producto:
            </h4>
            <div>
              <select onChange={this.handleSelectChange} defaultValue="0">
                <option value="">Selecciona un tipo de producto</option>
                {this.state.tiposProducto.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br></br>

          <div style={{ display: "flex" }}>
            <h4 style={{ width: "250px" }}>
              Paso 2: seleccion tipo de sabor producto:
            </h4>
            <div style={{ marginRight: "10px" }}>
              <select
                id="tipoSaborSelect"
                value={this.state.selectedTipoSabor}
                onChange={this.handleSelectChangeTipoSabor}
                defaultValue="0"
              >
                <option value="">Selecciona un tipo de sabor</option>
                {this.state.tiposSaborProductos.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br></br>

          <div style={{ marginTop: "10px" }}>
            {this.state.insumosRecetaProducto.map(
              (insumo, index) =>
                index === 0 && (
                  <p key={index}>
                    {Object.entries(insumo).map(([key, value]) => (
                      <div key={key} style={{ display: "flex" }}>
                        <p style={{ width: "150px" }}>
                          <strong>{key}:</strong>
                        </p>

                        {key !== "tipo_producto" ? (
                          <input
                            type="number"
                            value={value}
                            onChange={(event) =>
                              this.handleInputChange(event, key)
                            }
                          />
                        ) : (
                          <div style={{ width: "150px" }}>
                            <span>{value}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </p>
                )
            )}
          </div>

          {this.state.insumosRecetaProducto.length > 0 && (
            <div style={{ marginLeft: "auto" }}>
              <button
                className="btn btn-success btn-lg"
                onClick={() => this.handleUpdateInsumos()}
                style={{ marginRight: "10px" }}
              >
                Agregar insumo
              </button>
              <button
                className="btn btn-success btn-lg"
                onClick={() => this.handleUpdateRecete()}
              >
                Guardar
              </button>
            </div>
          )}
        </div>

        <div className="col-lg-12 target-element">
          <DialogComponent
            id="modalDialog"
            isModal={true}
            buttons={this.buttons}
            header="Seleccione los insumos que quiere agregar"
            width="500px"
            content={this.contenidoModal.bind(this)}
            ref={(dialog) => (this.dialogInstance = dialog)}
            target="#target"
            visible={this.state.hideDialog}
            open={this.dialogOpen.bind(this)}
            close={this.dialogClose.bind(this)}
          ></DialogComponent>
        </div>
      </div>
    );
  }
}

export default AdminSeguimientoRecetas;
