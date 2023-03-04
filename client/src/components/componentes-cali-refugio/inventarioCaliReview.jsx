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
          fetch('http://54.236.28.178:80/api/leerinventarios/' + today, requestOptions)
              .then(response => response.json())
              .then(data => {
                if(data.inv === undefined){
                    this.setState({
                        inve_aux: [],
                        inve_final: []
                    })
                }else{
                    this.setState({
                        inve_aux: data.inv.resulta_aux,
                        inve_final: data.inv.result_inventario
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
          fetch('http://54.236.28.178:80/api/leerinventarios/' + e.target.value, requestOptions)
              .then(response => response.json())
              .then(data => {
                if(data.inv === undefined){
                    this.setState({
                        inve_aux: [],
                        inve_final: []
                    })
                }else{
                    this.setState({
                        inve_aux: data.inv.resulta_aux,
                        inve_final: data.inv.result_inventario
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

                <BarChart
                    width={1200}
                    height={500}
                    data={this.state.inve_aux}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item_tipo" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="item_tipo" height={30} stroke="#9B9B9B" />
                    <Bar dataKey="item_cantidad_entrada" fill="#4B70CE" />
                    <Bar dataKey="item_cantidad" fill="#1B1B1B" />
                </BarChart>

            </div>
        );
    }
}

export default inventarioCaliReview;