const ProductosCuadreInsumos = require("../models/costo_productos");

function returnTipoProducto(result_ventas_auxn) {
  const objetoPedidoDelDia = [];

  result_ventas_auxn.map((item, index) => {
    item.pedido.map((item2, index2) => {
      let saborKey = Object.keys(item2).find(
        (key) =>
          key.startsWith("sabor") ||
          key.startsWith("mitad") ||
          key.startsWith("cuarto")
      );

      if (saborKey?.includes("sabor")) {
        objetoPedidoDelDia.push({"tipo": item2.tipo, "sabor_uno": item2[saborKey]});
      } else if (saborKey?.includes("mitad")) {
        objetoPedidoDelDia.push({"tipo": item2.tipo, "sabor_uno": item2.mitad_uno, "sabor_dos": item2.mitad_dos});
      } else if (saborKey?.includes("cuarto")) {
        objetoPedidoDelDia.push({"tipo": item2.tipo, "sabor_uno": item2.cuarto_uno, "sabor_dos": item2.cuarto_dos, "sabor_tres": item2.cuarto_tres, "sabor_cuatro": item2.cuarto_cuatro});
      } else {
        let cantidadProductoInsumo = item2.tipo.split("X");
        objetoPedidoDelDia.push({"tipo": cantidadProductoInsumo[0].trim(), "cantidad": parseInt(cantidadProductoInsumo[1].trim())});  
      }
    });
  });

  //console.log(objetoPedidoDelDia);
}

module.exports = returnTipoProducto;
