const mongose = require('mongoose');
const insumosShema = new mongose.Schema({
META_DIA:                           {type: String},
META_SEMANA:                        {type: String},
META_MES:                           {type: String},
META_ANIO:                          {type: String},
})
module.exports = mongose.model('metas_pizzarra', insumosShema)