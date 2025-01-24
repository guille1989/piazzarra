const mongose = require("mongoose");
const gastosFijosShema = new mongose.Schema({
  category: { type: String },
  expenses: { type: Array },
});
module.exports = mongose.model("categorias_gastos_fijos", gastosFijosShema);
