import React, { Component } from "react";
import InnoAppVector from "../images/innoappisov.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      contrasenia: "",
    };
  }

  usuarioChange(event) {
    this.setState({
      usuario: event.target.value,
    });
  }

  contraseniaChange(event) {
    this.setState({
      contrasenia: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        usuario: this.state.usuario,
        contrasenia: this.state.contrasenia,
      }),
    };
    fetch(
      `http://${process.env.REACT_APP_URL_PRODUCCION}/api/inicio`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.usuario !== "" &&
          data.usuario !== null &&
          data.usuario !== undefined
        ) {
          this.props.loginHandlerCaliRefugio(data.usuario);
        } else {
          toast.error("Fallo el login, revisar los datos!");
          console.log("Error en las credenciales !");
        }
        localStorage.setItem("usuario", data.usuario);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <div className="loginPage">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            <h2>PIZZERIA LA PIZZARRA</h2>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div
                className="mb-3 row"
                style={{ width: "200px", fontSize: "20px" }}
              >
                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={this.usuarioChange.bind(this)}
                    defaultValue={"Default"}
                  >
                    <option selected>Seleccione Pizzarra</option>
                    <option value="Cali - Refugio">Cali - Refugio</option>
                    <option value="Popayan - Centro">Popayan - Centro</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div
                className="mb-3 row"
                style={{ width: "200px", fontSize: "20px" }}
              >
                <div>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    onChange={this.contraseniaChange.bind(this)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button type="submit" className="btn btn-success w-100">
                  Entrar !
                </button>
              </div>
            </form>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "",
              position: "fixed",
              bottom: 0,
              width: "100%",
              justifyContent: "center",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <p>Powered by InnoApp</p>
            <img
              src={InnoAppVector}
              style={{ width: "45px", height: "45px" }}
              alt="404"
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
