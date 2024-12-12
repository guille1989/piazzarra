import React, { Component } from 'react';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';

class AdminSeguimientoRecetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recetas: [],
            tiposProducto: [],
            insumosRecetaProducto: [],  
            tipoProductoSeleccionado: '',
            tiposSaborProductos:['Selecciona primero tipo de producto'],
            recetaValue: '0',
            recetaKey: '',
            dataLoaded: false
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
                const tiposDeProducto = this.obtenerTiposDeProducto(data);
                this.setState({ recetas: data, dataLoaded: true , tiposProducto: tiposDeProducto});
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event, key) => {
        const newRecetas = [...this.state.insumosRecetaProducto];
        newRecetas[0][key] = parseInt(event.target.value);
        this.setState({ insumosRecetaProducto: newRecetas });
    };

    handleUpdateRecete = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.insumosRecetaProducto[1],
                datos_actualizar: this.state.insumosRecetaProducto[0]
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
    }

    // Función para extraer todos los tipos de tipo_producto
    obtenerTiposDeProducto(data) {
        const tiposDeProducto = new Set();
    
        data.forEach(item => {
        item.DATOS.forEach(dato => {
            tiposDeProducto.add(dato.tipo_producto);
        });
        });
        return Array.from(tiposDeProducto);
    }

    obtenerTiposSaborPorProducto(data, tipoProducto) {
        const tiposSabor = new Set();
        
        data.forEach(item => {
            item.DATOS.forEach(dato => {
            if (dato.tipo_producto === tipoProducto) {
                tiposSabor.add(item.TIPO_SABOR);
            }
            });
        });
        
        return Array.from(tiposSabor);
    }

    obtenerInsumosDeProductoPorSabor(data, tipoProducto, tipoSabor) {
        let insumos = [];   
        data.forEach(item => {
            item.DATOS.forEach(dato => {
            if (dato.tipo_producto === tipoProducto && item.TIPO_SABOR === tipoSabor) {
                insumos.push(dato);
                insumos.push(item._id);
            }
            });
        });

        this.setState({ insumosRecetaProducto: insumos });
    }

    handleSelectChange = (event) => {
        const tiposSaborFiltrados = this.obtenerTiposSaborPorProducto(this.state.recetas, event.target.value);
        document.getElementById('tipoSaborSelect').value = '';
        this.setState({ tiposSaborProductos: tiposSaborFiltrados, tipoProductoSeleccionado: event.target.value, insumosRecetaProducto: [] });
    }

    handleSelectChangeTipoSabor = (event) => {
        this.obtenerInsumosDeProductoPorSabor(this.state.recetas, this.state.tipoProductoSeleccionado, event.target.value);
    }	

    render() {
        if (!this.state.dataLoaded) {
            return <div>Cargando datos...</div>;
        }

        return (
            <div>
                <div>
                    <div style={{ display:'flex' }}>
                        <p style={{ width:'250px' }}>
                            Paso 1: seleccion tipo de producto:
                        </p>
                        <div>
                            <select onChange={this.handleSelectChange}>
                                <option value="">Selecciona un tipo de producto</option>
                                {this.state.tiposProducto.map((tipo, index) => (
                                    <option key={index} value={tipo}>
                                    {tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br></br>

                    <div style={{ display:'flex' }}>
                        <p style={{ width:'250px' }}>
                            Paso 2: seleccion tipo de sabor producto:
                        </p>
                        <div style={{ marginRight:'10px' }}>
                            <select id='tipoSaborSelect' value={this.state.selectedTipoSabor} onChange={this.handleSelectChangeTipoSabor}>
                                <option value="">Selecciona un tipo de sabor</option>
                                {this.state.tiposSaborProductos.map((tipo, index) => (
                                    <option key={index} value={tipo}>
                                    {tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br></br>

                    <div style={{ marginTop:'10px' }}>
                        {this.state.insumosRecetaProducto.map((insumo, index) => (
                            index === 0 && (
                        <p key={index}>
                            {Object.entries(insumo).map(([key, value]) => (
                            <div key={key} style={{ display:'flex' }}>
                                <p style={{ width:'150px' }}><strong>{key}:</strong></p>

                                {key !== 'tipo_producto' ? (
                                    <input
                                        type="number"
                                        value={value}
                                        onChange={(event) => this.handleInputChange(event, key)}
                                    />
                                    ) : (
                                        <div style={{ width:'150px' }}>
                                            <span>{value}</span>
                                        </div>
                                    )}

                            </div>
                            ))}
                        </p>
                            )
                        ))}
                    </div>

                    {this.state.insumosRecetaProducto.length > 0 && (
                        <div style={{ marginLeft: 'auto' }}>
                            <button className="btn btn-success btn-lg" style={{ marginRight: '10px' }}>Agregar insumo</button>
                            <button className="btn btn-success btn-lg" onClick={() => this.handleUpdateRecete()}>Guardar</button>
                        </div>
                    )}
                
                </div>
            </div>
        );
    }
}



export default AdminSeguimientoRecetas;