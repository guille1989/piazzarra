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
    fetch('http://100.25.138.195/api/inicio', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.usuario === 'Cali - Refugio'){
            this.props.loginHandlerCaliRefugio()
          }else{
            console.log('Error en las credenciales !')
          }

          localStorage.setItem( 'usuario', data.usuario );
        })
        .catch(err => console.log(err))
  }

  render() {
    return (
        <div className="container-sm">
          <h2>Pizzarra inventario Cali</h2>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="mb-3 row">
              <label for="staticEmail" className="col-sm-2 col-form-label">Pizzarra</label>
              <div className="col-sm-10">
                <select className="form-select" aria-label="Default select example" onChange={this.usuarioChange.bind(this)}>
                  <option selected>Seleccione Pizzarra</option>
                  <option value="Cali - Refugio">Cali - Refugio</option>
                  <option value="Popayan - Centro">Popayan - Centro</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
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