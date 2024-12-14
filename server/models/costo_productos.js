const mongose = require('mongoose');
const costosShema = new mongose.Schema({
TIPO_SABOR:                     {type: String},
DATOS:                          {type: Array}
})
module.exports = mongose.model('costo_productos', costosShema)