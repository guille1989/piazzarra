const mongose = require('mongoose');
const insumosShema = new mongose.Schema({
TIPO:                           {type: String},
})
module.exports = mongose.model('insumos', insumosShema)