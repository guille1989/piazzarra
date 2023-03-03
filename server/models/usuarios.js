const mongose = require('mongoose');
const usuariosShema = new mongose.Schema({
usuario:                           {type: String},
contrasenia:                       {type: String},
})
module.exports = mongose.model('usuarios', usuariosShema)