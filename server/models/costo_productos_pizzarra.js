const mongose = require('mongoose');
const costosProductoShema = new mongose.Schema({
TIPO:                        {type: String},
COSTO:                       {type: Number}
})
module.exports = mongose.model('costo_productos_pizzarra', costosProductoShema)