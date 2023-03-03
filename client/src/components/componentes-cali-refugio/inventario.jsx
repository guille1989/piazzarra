import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

import InventarioCaliRefugioNuevo from './inventarioCaliRefugio';
import InventarioCaliRefugioReview from './inventarioCaliReview';

import '../../App.css'

class inventario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaHoy: ''
        }
    }

    componentDidMount(){
        this.setState({
            fechaHoy: new Date().toLocaleDateString('en-US')
        })
    }    

    salirInventarios(){
        this.props.logoutHandler()
    }
   
    render() {
        return (
            <Router>
            <div className="container-sm">   

                <br></br>

                <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                    <div className="container-fluid">

                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/">Resumen Inventarios </Link>
                                    </button>                                    
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn btn-light">
                                        <Link to="/NuevoResumen">Diligenciar Nuevo Inventario</Link>
                                    </button>      
                                </li>
                            </ul>
                        </div>
                        

                        <button className="navbar-brand btn btn-warning" onClick={this.salirInventarios.bind(this)}>Salir</button>
                    </div>
                </nav>    

                <hr className="border border-3 opacity-100"></hr>

                <Routes>
                    <Route path="/" element={<InventarioCaliRefugioReview></InventarioCaliRefugioReview>} />
                    <Route path="/NuevoResumen" element={<InventarioCaliRefugioNuevo></InventarioCaliRefugioNuevo>} />
                </Routes>

            </div>
            </Router>
        );
    }
}

export default inventario;