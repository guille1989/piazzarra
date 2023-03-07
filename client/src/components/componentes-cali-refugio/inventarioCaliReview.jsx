import React, { Component } from 'react';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

class inventarioCaliReview extends Component {
    constructor(props) {
        super(props);
        this.state={
            fecha_aux_01: '',
            inve_final: [],
            inve_entradas: [],
            inve_entradas_costos: [],
            inve_aux: [],
        }
    }
    
    componentDidMount(){
        //Fecha
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("fechaHoyRInventario").value = today

        this.setState({
            fecha_aux_01: today
        })

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
          fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/leerinventarios/` + today, requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if(data.inv === undefined){
                    this.setState({
                        inve_aux: [],
                        inve_final: [],
                        inve_entradas: [],
                        inve_entradas_costos: []
                    })
                }else{
                    this.setState({
                        inve_aux: data.inv.resulta_aux,
                        inve_final: data.inv.result_inventario_tabla_resumen,
                        inve_entradas: data.inv.result_inventario_entrada_tabla_resumen,
                        inve_entradas_costos: data.inv.result_inventario_entrada_costos_tabla_resumen
                    })
                }
              })
              .catch(err => console.log(err))
    }

    handleFechaHoy(e){

        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
          fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/leerinventarios/` + e.target.value, requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if(data.inv === undefined){
                    this.setState({
                        inve_aux: [],
                        inve_final: [],
                        inve_entradas: [],
                        inve_entradas_costos: []
                    })
                }else{
                    this.setState({
                        inve_aux: data.inv.resulta_aux,
                        inve_final: data.inv.result_inventario_tabla_resumen,
                        inve_entradas: data.inv.result_inventario_entrada_tabla_resumen,
                        inve_entradas_costos: data.inv.result_inventario_entrada_costos_tabla_resumen
                    })
                }
              })
              .catch(err => console.log(err))

        this.setState({
            fecha_aux_01: e.target.value
        })
    }

    render() {
        return (
            <div className="container-sm">  

                <br></br>
                <br></br>

                <h3>Seleccione fecha para la revision de inentario: </h3>

                <br></br>

                <input 
                    type="date" 
                    id="fechaHoyRInventario"

                    onChange={this.handleFechaHoy.bind(this)}

                    className="form-control p-3 g-col-6" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-sm" 
                />

                <br></br>

                <p>Inventario correspondiente a fecha: </p>

                {(() => {
                        if (this.state.inve_aux.length > 0) {
                            return (
                                <h2 className="avisoFechaSiHay"><strong> Inventario correspondiente a fecha: {this.state.fecha_aux_01}</strong></h2>                                                                                                            
                            )
                            } else {
                            return (                                
                                <h3 className="avisoFechaNoHay"> <strong>{this.state.fechaRegistroInventario}</strong> El inventario no se encuentra registrado !</h3>
                            )
                            }
                            })()
                        }

                <table className="table">                
                        <tbody>
                            <tr>
                            <th scope="col" className="fs-1">INSUMO</th>
                            <th scope="col" className="fs-2">Insumo Entrada</th>
                            <th scope="col" className="fs-2">Insumo Entrada Costo</th>
                            <th scope="col" className="fs-2">Insumo Final</th>
                            </tr>

                            {this.state.inve_final.map((item, index) => {
                                return(
                                    <>
                                        <tr key={index}>
                                            <td><strong>{item.Item}</strong></td>
                                            <td><strong>{this.state.inve_entradas[index].Valor}</strong></td>
                                            <td><strong>{this.state.inve_entradas_costos[index].Valor}</strong></td>
                                            <td><strong>{item.Valor}</strong></td>
                                        </tr>
                                    </>
                                )                                
                            })}

                        </tbody>
                </table>
            </div>
        );
    }
}

export default inventarioCaliReview;