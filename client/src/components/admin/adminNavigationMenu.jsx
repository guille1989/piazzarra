import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

import '../../App.css'

import InicioAdmin from './adminReviewInventarios';
import OpcionesAdmin from './adminOpciones';
import VentasAdmin from './adminReviewVentas';
import ComprasAdmin from  './adminReviewCompras';
import Graficas from './adminDashboard';

class adminReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }

    componentDidMount(){

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
                        <a className="navbar-brand" href="/">Seguimiento Inventarios</a>
                        <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                        className="navbar-collapse collapse"
                        id="navbarSupportedContent"
                        >

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="navbar-brand" aria-current="page" href="/ComprasResumen">Seguimiento Compras</a>
                            </li>
                        
                            <li className="nav-item">
                            <a className="navbar-brand" aria-current="page" href="/VentasResumen">Seguimiento Ventas</a>
                            </li>

                            <li className="nav-item">
                            <a className="navbar-brand" aria-current="page" href="/Dashboard">Dashboard</a>
                            </li>

                            <li className="nav-item">
                            <a className="navbar-brand" aria-current="page" href="/Opciones">Opciones</a>
                            </li>
                        </ul>

                        <button className="btn btn-outline-danger" onClick={this.salirInventarios.bind(this)}>Salir</button>
                        </div>
                    </div>
                </nav> 

                <Routes>
                    <Route path="/" element={<InicioAdmin></InicioAdmin>} />
                    <Route path="/Opciones" element={<OpcionesAdmin></OpcionesAdmin>}/>
                    <Route path="/VentasResumen" element={<VentasAdmin></VentasAdmin>}/>
                    <Route path='/ComprasResumen' element={<ComprasAdmin></ComprasAdmin>}/>
                    <Route path='/Dashboard' element={<Graficas></Graficas>}/>
                </Routes>

            </Router>
        );
    }
}

export default adminReview;