import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

import { SidebarComponent, ToolbarComponent, ItemsDirective, ItemDirective, Sidebar } from '@syncfusion/ej2-react-navigations';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';

import { useNavigate } from "react-router-dom";
import InventarioPopayanRefugioNuevo from './inventarioPopayanCentro';
import InventarioPopayanRefugioReview from './inventarioPopayanReview';

import GastosFijosPopayan from './gastisFijosPopayan';

import '../../App.css'

function PizzarraNavBarUserP(props){   
    const navigate = useNavigate();

    const salirInventarios = () => {
        props.logoutHandler()
    }

    //****
    let sidebarobj;
    let menuItems = [
        {
            text: 'Seguimiento Inventarios',
            iconCss: 'e-icons e-description',
            
        },
        {
            text: 'Ingresar datos Inventario',
            iconCss: 'e-icons e-changes-previous',
           
        },
        {
            text: 'Ingresar gastos fijos',
            iconCss: 'e-icons e-number-formatting',
           
        },
       
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
        if(e.item.text === 'Seguimiento Inventarios'){
            navigate("/");
        }else if(e.item.text === 'Ingresar datos Inventario'){
            navigate("/NuevoResumen");
        }else if(e.item.text === 'Ingresar gastos fijos'){
            navigate("/GastosFijos");
        }
   }

    let folderEle = '<div class= "e-folder"><div class= "e-folder-name">Pizzeria la Pizzarra</div></div>';
    let folderOut = '<div class= "e-folder"><div class= "e-folder-name">Salir</div></div>';
   
    return (
        <>
                           
                <div id="menu-wrapper" className="control-section">
                    <div id="sidebarmenu" style={{ height:'100%' }}>
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
                        <div className="main-menu-content" id="maintext" style={{ height:'100%' }}>
                            <div className="menu-content">   

                            <Routes>
                                <Route path="/" element={<InventarioPopayanRefugioReview></InventarioPopayanRefugioReview>} />
                                <Route path="/NuevoResumen" element={<InventarioPopayanRefugioNuevo></InventarioPopayanRefugioNuevo>} />
                                <Route path="/GastosFijos" element={<GastosFijosPopayan></GastosFijosPopayan>} />
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
        </>
    );
}

export default PizzarraNavBarUserP;