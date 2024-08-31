import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import InventarioCali from './components/componentes-cali-refugio/inventario';
import InventarioPopayan from './components/componentes-popayan-centro/inventario';
import Login from './components/login';

import Admin from './components/admin/adminNavigationMenu';

import { ToastComponent, MessageComponent } from '@syncfusion/ej2-react-notifications';

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
    }else if(usuarioAutenticacion === 'Popayan - Centro'){
      this.setState({
        usuarioLogin: 'Popayan - Centro'
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
    this.successClick() 
    if(usuario === 'Cali - Refugio'){
      this.setState({
        usuarioLogin: 'Cali - Refugio'
      })
    } else if (usuario === 'Popayan - Centro') {
      this.setState({
        usuarioLogin: 'Popayan - Centro'
      })
    } else if (usuario === 'Admin'){
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

  toastObj;
  infoBtn;
  warnBtn;
  successBtn;
  errorBtn;
  hideTosat;
  position = { X: 'Right' };
  toasts = [
      { title: 'Warning!', content: 'Por favor coloque los datos de usuario y contraseña.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
      { title: 'Hola', content: 'Bienvenido !', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
      { title: 'Error!', content: 'Por favor coloque los datos de usuario y contraseña correctos.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' }
  ];

  infoClick() {
      this.toastObj.show(this.toasts[3]);
  }
  warningClick() {
      this.toastObj.show(this.toasts[0]);
  }
  successClick() {
      this.toastObj.show(this.toasts[1]);
  }
  errorClick() {
      this.toastObj.show(this.toasts[2]);
  }
  hideClick() {
      this.toastObj.hide('All');
  }
  onclose(e) {
      if (e.toastContainer.childElementCount === 0) {
          this.hideTosat.element.style.display = 'none';
      }
  }

  render() {
    const opcionPantalla = () => {
      switch(this.state.usuarioLogin){
        case "": return <Login loginHandlerCaliRefugio={this.handleLogInCaliRefugio.bind(this)}/>
        case "Cali - Refugio": return <InventarioCali logoutHandler={this.handleLogOut.bind(this)}/>
        case "Popayan - Centro": return <InventarioPopayan logoutHandler={this.handleLogOut.bind(this)}/>
        case "Admin": return <Admin logoutHandler={this.handleLogOut.bind(this)}/>

        default: return <h1>Algo paso.... contacte al administrador !</h1>
      }
    } 
    return (
      <>
        <ToastComponent ref={(toast) => { this.toastObj = toast; }} id='toast_type' position={this.position} close={this.onclose.bind(this)}></ToastComponent>
        { opcionPantalla() }
      </>
    );
  }
}

export default App;