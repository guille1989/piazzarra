import React, { Component } from 'react';
import { ProgressButtonComponent } from '@syncfusion/ej2-react-splitbuttons';

class adminResultados extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleFechaHoy(e){
        //Configuramos fecha inicial
        this.setState({
            fecha_inicio_busqueda: e.target.value
        })
    }

    handleFechaFinal(e){
        //Configuramos fecha final
        this.setState({
            fecha_final_busqueda: e.target.value
        })
    }

    contractBtn;

    contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }
    contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }

    handleBusquedaFechas(){

    }    

    render() {
        return (
            <div className='contenedor'>
                <br></br>
                <br></br>

                <h1>Resultado Operacion Pizzarra Popayan: </h1>
                
                <hr className="border border-3 opacity-100"></hr>

                <h3>Filtros: </h3>
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
                    <ProgressButtonComponent id="contract" content="CONSULTAR FECHAS" ref={(scope) => { this.contractBtn = scope; }} onClick={() => this.handleBusquedaFechas()} className='lg' isPrimary begin={this.contractBegin.bind(this)} end={this.contractEnd.bind(this)}></ProgressButtonComponent>
                </div>

                <br></br>
                <br></br>

                <hr className="border border-3 opacity-100"></hr>

                <br></br>
            </div>
        );
    }
}

export default adminResultados;