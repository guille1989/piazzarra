import React, { Component } from 'react';
import InnoAppVector from '../images/innoappisov.png';
import { ToastComponent, MessageComponent } from '@syncfusion/ej2-react-notifications';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

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
          if(data.usuario !== '' && data.usuario !== null && data.usuario !== undefined){       
            this.props.loginHandlerCaliRefugio(data.usuario)
          }else{
            this.errorClick()
            console.log('Error en las credenciales !')      
          }
          localStorage.setItem('usuario', data.usuario );
        })
        .catch(err => console.log(err))
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
      { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
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
    
    return (
      <>
        <div className="loginPage">
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'50px'}}>
          <h2>PIZZERIA LA PIZZARRA</h2>
          </div>
          <ToastComponent ref={(toast) => { this.toastObj = toast; }} id='toast_type' position={this.position} close={this.onclose.bind(this)}></ToastComponent>
          
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="mb-3 row" style={{width:'200px', fontSize:'20px'}}>
              <div>
                <select className="form-select" aria-label="Default select example" onChange={this.usuarioChange.bind(this)} defaultValue={'Default'}>
                  <option selected>Seleccione Pizzarra</option>
                  <option value="Cali - Refugio">Cali - Refugio</option>
                  <option value="Popayan - Centro">Popayan - Centro</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row" style={{width:'200px', fontSize:'20px'}}>
              <div>
                <input type="password" className="form-control" id="inputPassword"  placeholder="Password" onChange={this.contraseniaChange.bind(this)}/>
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <button type="submit" className="btn btn-success w-100">Entrar !</button>
            </div>
          </form>
          </div>

          <div style={{ display: 'flex', 
                        flexDirection: '', 
                        position: 'fixed', 
                        bottom: 0, 
                        width: '100%', 
                        justifyContent: 'center',
                        fontSize: '20px',
                        alignItems: 'center',
                        }}>
            <p>Powered by InnoApp</p>
            <img src={InnoAppVector} style={{ width: '45px', height: '45px' }} alt="404" />
          </div>
        </div>
        </>
    );
  }
}

export default App;