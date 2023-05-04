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

import InicioAdminPopayan from './popayan-centro/adminReviewInventarioPC';
import ComprasAdminPopayan from './popayan-centro/adminReviewComprasPC';
import VentasAdminPopayan from './popayan-centro/adminReviewVentasPC';
import GraficasAdminProduccion from './adminDashboardProduccion';
import SeguimientoCostos from './adminSeguimientoCostos';
import ResultadoPopayan from './popayan-centro/adminResultados';
import AjusteCostos from './adminAjusteCostos';

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
            ]
        },
        {
            text: 'Seguimiento Compras',
            iconCss: 'e-icons e-changes-previous',
            items: [
                { text: 'Compras - Cali - Refugio' },
                { text: 'Compras - Popayan - Centro' }
            ]
        },
        {
            text: 'Seguimiento Ventas',
            iconCss: 'e-icons e-changes-next',
            items: [
                { text: 'Ventas - Cali - Refugio' },
                { text: 'Ventas - Popayan - Centro' }
            ]
        },
        {
            text: 'Seguimiento Costos',
            iconCss: 'e-icons e-search',
            items: [
                { text: 'Costos - Productos' },
                { text: 'Ajuste - Costos - Productos'}
            ]
        },
        {
            text: 'Tablero de datos',
            iconCss: 'e-icons e-chart',
            items: [
                { text: 'Dashboard - Ventas' },
                
            ]
        },
        {
            text: 'Resportes Operaciones',
            iconCss: 'e-icons e-rename',
            items: [
                { text: 'Reporte Operacion - Popayan' },
                
            ]
        },
        {
            text: 'Configuracion',
            iconCss: 'e-icons e-settings',
            items: [
                { text: 'Configuracion - Globales' },
                { text: 'Configuracion - Popayan - Centro' },
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
        //console.log(e.item.text)

        switch(e.item.text) {
            case 'Inventario - Cali - Refugio':
                navigate("/");
                break;
            case 'Compras - Cali - Refugio':
                navigate("/ComprasResumen");
                break;
            case 'Ventas - Cali - Refugio':
                navigate("/VentasResumen");
                break;
            case 'Dashboard - Ventas':
                navigate("/Dashboard");
                break;
            case 'Configuracion - Globales':
                navigate("/Opciones");
                break;
            case 'Inventario - Popayan - Centro':
                navigate("/AdminPopayan");
                break;
            case 'Compras - Popayan - Centro':
                navigate("/ComprasResumenPopayan");
                break;
            case 'Ventas - Popayan - Centro':
                navigate("/VentasResumenPopayan");
                break;
            case 'Dashboard - Produccion':
                navigate("/DashboardProduccion");
                break;
            case 'Costos - Productos':
                navigate("/SeguimientoCostos")
                break;
            case 'Reporte Operacion - Popayan':
                navigate("/ResultadoOperacionPopayan")
                break;
            case 'Ajuste - Costos - Productos':
                navigate("/AjusteCostosProductos")
                break;
            default:
              // code block
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
                                <Route path='/DashboardProduccion' element={<GraficasAdminProduccion></GraficasAdminProduccion>}/>

                                <Route path='/AdminPopayan' element={<InicioAdminPopayan></InicioAdminPopayan>}/>
                                <Route path='/ComprasResumenPopayan' element={<ComprasAdminPopayan></ComprasAdminPopayan>}/>
                                <Route path='/VentasResumenPopayan' element={<VentasAdminPopayan></VentasAdminPopayan>}/>
                                <Route path='/SeguimientoCostos' element={<SeguimientoCostos></SeguimientoCostos>} />  

                                <Route path='/ResultadoOperacionPopayan' element={<ResultadoPopayan></ResultadoPopayan>}/>   
                                <Route path='/AjusteCostosProductos' element={<AjusteCostos></AjusteCostos>}/>                          

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