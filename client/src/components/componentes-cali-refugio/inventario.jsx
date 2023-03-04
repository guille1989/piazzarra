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
                <br></br>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Inicio</a>
                        <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div
                        className="navbar-collapse collapse"
                        id="navbarSupportedContent"
                        >
                            
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="navbar-brand" aria-current="page" href="/NuevoResumen">Cuadre Inventarios</a>
                            </li>
                        </ul>

                        <button className="btn btn-outline-danger" onClick={this.salirInventarios.bind(this)}>Salir</button>
                        </div>
                    </div>
                </nav> 

                <Routes>
                    <Route path="/" element={<InventarioCaliRefugioReview></InventarioCaliRefugioReview>} />
                    <Route path="/NuevoResumen" element={<InventarioCaliRefugioNuevo></InventarioCaliRefugioNuevo>} />
                </Routes>

            </Router>
        );
    }
}

export default inventario;