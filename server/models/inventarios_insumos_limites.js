const mongose = require('mongoose');
const inventarioShcema = new mongose.Schema({
    INVENTARIO_AUX: {type: Array},
    FECHA_INVENTARIO_ACTUAL: {type: String},

    MASAS_PERSONALES:       {type: Number},
    MASAS_MEDIANAS:         {type: Number},
    PANNE_COOK:             {type: Number},
    PAN_OREGANO:            {type: Number},
    MASA_CRUDA:             {type: Number},
    FETUCHINNIS_PORCION:    {type: Number},
    SPAGUETTYS_PORCION:     {type: Number},
    PASTA_LASAÑA_PORCION:   {type: Number},
    JUGOS_NATURALES_MANGO:  {type: Number},
    JUGOS_NATURALES_LULO:   {type: Number},
    JUGOS_NATURALES_MORA:   {type: Number},
    JUGOS_NATURALES_GUANABANA: {type: Number},
    CERVEZA_CULB:           {type: Number},
    CERVEZA_POKER:          {type: Number},
    CERVEZA_AGUILA:         {type: Number},
    COCA_COLA_350:          {type: Number},
    COCA_COLA_350_ZERO:     {type: Number},
    COCA_COLA_L4:           {type: Number},
    AGUA_NORMAL:            {type: Number},
    AGUA_GAS:               {type: Number},
    VINO_TINTO:             {type: Number},
    VINO_BLANCO:            {type: Number},
    CAFE:                   {type: Number},
    VINO:                   {type: Number},
    QUESO:                  {type: Number},
    LIMONES:                {type: Number},
    CABANOS:                {type: Number},
    JAMON:                  {type: Number},
    SALAMI:                 {type: Number},
    TOCINETA:               {type: Number},
    POLLO:                  {type: Number},
    CARNE_MOLIDA:           {type: Number},
    PEPERONI:               {type: Number},
    CHAMPINIONES:           {type: Number},
    HIGOS:                  {type: Number},
    ACEITUNAS:              {type: Number},
    PINIA_CALADA:           {type: Number},
    TOMATES_SECOS:          {type: Number},
    QUESO_PARMESANO:        {type: Number},
    MAIZ:                   {type: Number},
    CEBOLLA:                {type: Number},
    PIMENTON:               {type: Number},
    AJO:                    {type: Number},
    LECHUGA:                {type: Number},
    JALAPENIOS:             {type: Number},
    MADURO:                 {type: Number},
    TOMATE:                 {type: Number},
    SALSA_NAPOLITANA_GALON: {type: Number},
    ACEITE_OLIVA:           {type: Number},
    MANTEQUILLA:            {type: Number},
    CREMA_LECHE:            {type: Number},
    LECHE:                  {type: Number},
    HUEVOS:                 {type: Number},
    CAJAS_PERSONALES:       {type: Number},
    CAJAS_PIZZA:            {type: Number},
    CAJAS_LASAGNIA:         {type: Number},
    MOLDES_LASAGNIA:        {type: Number},

});

module.exports = mongose.model('inventarios_insumos_limites', inventarioShcema);