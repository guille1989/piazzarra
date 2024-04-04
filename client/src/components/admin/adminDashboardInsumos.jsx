import React, { Component } from 'react';

//Componentes
import { ProgressButtonComponent } from '@syncfusion/ej2-react-splitbuttons';

class adminDashboardInsumos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha_inicio_busqueda: '',
            fecha_final_busqueda: ''
        }
    }



    handleFechaHoy(e){
        //Configuramos hoy
        var date = new Date(e.target.value);
        var day = date.getDate() + 1;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        //var today = year + "-" + month + "-" + day;

        //Mas 7 dias
        let dateAux = new Date(e.target.value);
        dateAux.setDate(dateAux.getDate() + 7);
        day = dateAux.getDate();
        month = dateAux.getMonth() + 1;
        year = dateAux.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        this.setState({
            fecha_inicio_busqueda: e.target.value
        })
    }

    handleFechaFinal(e){
        //Configuramos hoy
        //console.log(e.target.value)
        this.setState({
            fecha_final_busqueda: e.target.value
        })
    }

    contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }
    contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }

    render() {
        return (
            <div style={{height: "100vh"}}>
                <br></br>
                <br></br>

                <h1>Grafica Insumos: </h1>
                
                <hr className="border border-3 opacity-100"></hr>

                <h3>Filtros: </h3>
                {/* 
                <h4>1. Tipo periodo: </h4>
                    <select className="form-select" aria-label="Default select example" onChange={this.filtroChange.bind(this)}>
                        <option selected>Seleccione tipo periodo</option>
                        <option value="dia">Dia</option>
                        <option value="semana">Semanal</option>
                        <option value="mes">Mensual</option>
                        <option value="semestre">Semestral</option>
                        <option value="anual">anual</option>
                    </select>
                    <br></br>
                */}
                <h4>1. Seleccione Periodos Inicial: </h4>
                    <input 
                        type="date" 
                        id="fechaHoyRInventario"
                        onChange={this.handleFechaHoy.bind(this)}

                        className="form-control p-3 g-col-6 ls" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                    />
                <br></br>

                <h4>2. Seleccione Periodos Final: </h4>
                    <input 
                        type="date" 
                        id="fechaHoyRInventarioFinal"
                        onChange={this.handleFechaFinal.bind(this)}

                        className="form-control p-3 g-col-6 ls" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                    />

                <br></br>

                <h4>4. Buscar: </h4>
                
                <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                    <ProgressButtonComponent id="contract" content="CONSULTAR FECHAS" ref={(scope) => { this.contractBtn = scope; }} onClick={() => alert('OnClick!!!')} className='lg' isPrimary begin={this.contractBegin.bind(this)} end={this.contractEnd.bind(this)}></ProgressButtonComponent>
                </div>

                <br></br>
                <br></br>

                <hr className="border border-3 opacity-100"></hr>

                <br></br>
            </div>
        );
    }
}

export default adminDashboardInsumos;