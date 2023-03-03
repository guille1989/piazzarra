import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import InventarioCali from './components/componentes-cali-refugio/inventario';
import Login from './components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioLogin: ''
    }
  }
  
  componentDidMount(){
    const usuarioAutenticacion = localStorage.getItem( 'usuario' )

    if(usuarioAutenticacion === 'Cali - Refugio'){
      this.setState({
        usuarioLogin: 'Cali - Refugio'
      })
    }else{
      this.setState({
        usuarioLogin: ''
      })
    }
  }

  handleLogInCaliRefugio(){
    this.setState({
      usuarioLogin: 'Cali - Refugio'
    })
  }

  handleLogOut(){
    localStorage.removeItem('usuario')
    this.setState({
      usuarioLogin: ''
    })
  }

  render() {
    const opcionPantalla = () => {
      switch(this.state.usuarioLogin){
        case "": return <Login loginHandlerCaliRefugio={this.handleLogInCaliRefugio.bind(this)}/>
        case "Cali - Refugio": return <InventarioCali logoutHandler={this.handleLogOut.bind(this)}/>

        default: return <h1>Algo paso.... contacte al administrador !</h1>
      }
    } 
    return (
      <>
        { opcionPantalla() }
      </>
    );
  }
}

export default App;