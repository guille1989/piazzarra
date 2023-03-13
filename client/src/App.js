import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import InventarioCali from './components/componentes-cali-refugio/inventario';
import Login from './components/login';

import Admin from './components/admin/adminNavigationMenu';

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
    }else if(usuarioAutenticacion === 'Admin'){
      this.setState({
        usuarioLogin: 'Admin'
      })
    }else{
      this.setState({
        usuarioLogin: ''
      })
    }
  }

  handleLogInCaliRefugio(usuario){
    if(usuario === 'Cali - Refugio'){
      this.setState({
        usuarioLogin: 'Cali - Refugio'
      })
    }else if(usuario === 'Admin'){
      this.setState({
        usuarioLogin: 'Admin'
      })
    }
    
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
        case "Admin": return <Admin logoutHandler={this.handleLogOut.bind(this)}/>

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