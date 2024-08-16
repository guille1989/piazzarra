
function filterArray(arrayOne, arrayTwo){
    let insumosFiltrados = arrayOne.map(item => {
        let nuevoObjeto = {};
        arrayTwo.forEach(propiedad => {
          if (item.hasOwnProperty(propiedad)) {
            let itemAux = item[propiedad] ?  item[propiedad]?.toString() : "0"; 
            nuevoObjeto[propiedad] = itemAux;
          }
        });
        return nuevoObjeto;
      });

    return insumosFiltrados;
}

module.exports = filterArray;