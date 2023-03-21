import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { SidebarComponent, ToolbarComponent, ItemsDirective, ItemDirective, Sidebar } from '@syncfusion/ej2-react-navigations';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import "../../../node_modules/@syncfusion/ej2-icons/styles/material.css";

import '../../App.css'

import InicioAdmin from './adminReviewInventarios';
import OpcionesAdmin from './adminOpciones';
import VentasAdmin from './adminReviewVentas';
import ComprasAdmin from  './adminReviewCompras';
import Graficas from './adminDashboard';

function PizzarraNavBarAdmin(props){
    const navigate = useNavigate();
    
    const salirInventarios = () => {
        props.logoutHandler()
    }

    const regularBtnCreated = () => {
        this.regularBtn.element.setAttribute('aria-label', 'menu');
    }

   //****
    let sidebarobj;
    let menuItems = [
        {
            text: 'Inventarios',
            iconCss: 'e-icons e-description',
            items: [
                { text: 'Inventario - Cali - Refugio' },
                { text: 'Inventario - Popayan - Centro' },
                { text: 'Inventario - TODOS' }
            ]
        },
        {
            text: 'Seguimiento Compras',
            iconCss: 'e-icons e-changes-previous',
            items: [
                { text: 'Compras - Cali - Refugio' },
                { text: 'Compras - Popayan - Centro' },
                { text: 'Compras - TODOS' }
            ]
        },
        {
            text: 'Seguimiento Ventas',
            iconCss: 'e-icons e-changes-next',
            items: [
                { text: 'Ventas - Cali - Refugio' },
                { text: 'Ventas - Popayan - Centro' },
                { text: 'Ventas - TODOS' }
            ]
        },
        {
            text: 'Tablero de datos',
            iconCss: 'e-icons e-chart',
            items: [
                { text: 'Dashboard - Cali - Refugio' },
                { text: 'Dashboard - Popayan - Centro' },
                { text: 'Dashboard - TODOS' }
            ]
        },
        {
            text: 'Configuracion',
            iconCss: 'e-icons e-settings',
            items: [
                { text: 'Configuracion - Cali - Refugio' },
                { text: 'Configuracion - Popayan - Centro' },
                { text: 'Configuracion - TODOS' }
            ]
        }
    ];
    let enableDock = true;
    let dockSize = '50px';
    let width = '220px';
    let target = '.main-menu-content';

    const toolbarCliked = (args) => {
        if (args.item.tooltipText == "Menu") {
            sidebarobj.toggle();
        }else if(args.item.tooltipText == "Salir"){
            salirInventarios()
        }
    }
   //****
   const handleSideBarMenu = (e) => {
        console.log(e.item.text)
        if(e.item.text === 'Inventario - Cali - Refugio'){
            navigate("/");
        }else if(e.item.text === 'Compras - Cali - Refugio'){
            navigate("/ComprasResumen");
        }else if(e.item.text === 'Ventas - Cali - Refugio'){
            navigate("/VentasResumen");
        }else if(e.item.text === 'Dashboard - Cali - Refugio'){
            navigate("/Dashboard");
        }else if(e.item.text === 'Configuracion - Cali - Refugio'){
            navigate("/Opciones");
        }
   }

   let folderEle = '<div class= "e-folder"><div class= "e-folder-name">Pizzeria la Pizzarra</div></div>';
   let folderOut = '<div class= "e-folder"><div class= "e-folder-name">Salir</div></div>';
        return (           
                <>                
                <div id="menu-wrapper" className="control-section">
                    <div id="sidebarmenu">
                        {/* header-section  declaration */}
                        <div>
                            <ToolbarComponent id="menuToolbar" clicked={toolbarCliked}>
                                <ItemsDirective>
                                    <ItemDirective prefixIcon="e-icons e-menu" tooltipText="Menu"></ItemDirective>
                                    <ItemDirective template={folderEle}></ItemDirective>
                                    <ItemDirective template={folderOut} align='Right' tooltipText="Salir"></ItemDirective>
                                </ItemsDirective>
                            </ToolbarComponent>
                        </div>
                        {/* main content declaration */}
                        <div className="main-menu-content" id="maintext">
                            <div className="menu-content">   

                            <Routes>
                                <Route path="/" element={<InicioAdmin></InicioAdmin>} />
                                <Route path="/Opciones" element={<OpcionesAdmin></OpcionesAdmin>}/>
                                <Route path="/VentasResumen" element={<VentasAdmin></VentasAdmin>}/>
                                <Route path='/ComprasResumen' element={<ComprasAdmin></ComprasAdmin>}/>
                                <Route path='/Dashboard' element={<Graficas></Graficas>}/>
                            </Routes>

                            </div>
                        </div>
                        {/* end of main content declaration
                        sidebar element declaration */}
                        <SidebarComponent 
                            id="menuSidebar" 
                            className="sidebar-menu"                             
                            ref={Sidebar => sidebarobj = Sidebar} 
                            enableDock={enableDock} 
                            dockSize={dockSize} 
                            width={width} 
                            target={target} 
                            isOpen={true} 
                            type="Auto">
                                <div className="main-menu">
                                    <div>
                                        <MenuComponent id="dockMenu" items={menuItems} select={handleSideBarMenu} orientation='Vertical' cssClass='dock-menu'></MenuComponent>
                                    </div>
                                </div>
                        </SidebarComponent>
                    </div>
                </div>
                {/* 
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

                        <button className="btn btn-outline-danger" onClick={salirInventarios}>Salir</button>
                        </div>
                    </div>
                </nav> 
                */}
                </>
        );
}

export default PizzarraNavBarAdmin;