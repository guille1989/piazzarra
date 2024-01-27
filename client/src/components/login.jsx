import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      contrasenia: '',
    }
  }
  
  usuarioChange(event){
    this.setState({
      usuario: event.target.value
    })
  }

  contraseniaChange(event){
    this.setState({
      contrasenia: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();

    const requestOptions ={
      method: 'POST',
      headers : {'Content-type':'application/json'},
      body: JSON.stringify({usuario: this.state.usuario, contrasenia: this.state.contrasenia})    
    }      
    fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/inicio`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.usuario !== ''){
            this.props.loginHandlerCaliRefugio(data.usuario)
          }else{
            console.log('Error en las credenciales !')
          }

          localStorage.setItem('usuario', data.usuario );
        })
        .catch(err => console.log(err))
  }

  render() {
    return (
        <div className="loginPage">
          <h2>PIZZERIA LA PIZZARRA</h2>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Pizzarra</label>
              <div className="col-sm-10">
                <select className="form-select" aria-label="Default select example" onChange={this.usuarioChange.bind(this)} defaultValue={'Default'}>
                  <option selected>Seleccione Pizzarra</option>
                  <option value="Cali - Refugio">Cali - Refugio</option>
                  <option value="Admin - Cali">Admin - Cali</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword" onChange={this.contraseniaChange.bind(this)}/>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Entrar !</button>
          </form>
        </div>
    );
  }
}

export default App;