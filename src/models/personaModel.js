const mongoose = require('mongoose');
const { Schema } = mongoose;

const Persona = new Schema({
    CEDULA:String,
    COD_PERSONA:String,
    NOMBRE:String,
    APELLIDO:String,
    DIRECCION:String,
    TELEFONO:String,
    FEC_NAC:String,
    GENERO:String,
    ESTADO:String,
    CORREO:String
});

module.exports = mongoose.model('Persona', Persona);