import React, { Component } from 'react';

class AdminSeguimientoRecetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recetas: [],
            recetaValue: '0',
            recetaKey: '',
        }
    }

    componentDidMount() {
        const requestOptions ={
            method: 'GET',
            headers : {'Content-type':'application/json'},   
          }      
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimientorecetas`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ recetas: data })
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event, recetaIndex, datoIndex, key) => {
        const newRecetas = [...this.state.recetas];
        newRecetas[recetaIndex].DATOS[datoIndex][key] = event.target.value;
        this.setState({ recetas: newRecetas, recetaValue: event.target.value, recetaKey: key });
    };

    handleUpdateRecete = (id, tipo_producto) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                tipo_producto,
                tipo_insumo: this.state.recetaKey,
                value: this.state.recetaValue
            })
        };
        fetch(`http://${process.env.REACT_APP_URL_PRODUCCION}/api/admin/seguimientorecetas`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === 'Ok') {
                    alert('Receta actualizada');
                }
            })
            .catch(err => console.log(err))


        this.setState({ recetaValue: '0', recetaKey: '' });
    }

    render() {
        return (
            <div>
                {this.state.recetas.map((receta, recetaIndex) => {
                    return (
                        <div>
                            <h2>{receta.TIPO_SABOR}</h2>
                            <ul>                                
                                {receta.DATOS.map((dato, datoIndex) => {
                                    return (                                       
                                        <div key={datoIndex} style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
                                        {Object.keys(dato).map((key) => (
                                            <div key={key} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                                              <strong>{key}:</strong> 
                                              {key !== 'tipo_producto' ? (
                                                <input
                                                    type="text"
                                                    value={dato[key]}
                                                    onChange={(event) => this.handleInputChange(event, recetaIndex, datoIndex, key)}
                                                />
                                                ) : (
                                                    <span>{dato[key]}</span>
                                                  )}
                                            </div>
                                          ))}
                                          <button onClick={() => this.handleUpdateRecete(receta._id, dato.tipo_producto)}>Guardar</button>
                                        </div>

                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default AdminSeguimientoRecetas;