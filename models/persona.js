const mongoose = require('mongoose');

var Persona= mongoose.model('persona',{
    CEDULA:{type:String},
    NOMBRE:{type: String},
    APELLIDO:{type: String},
    DIRECCION:{type: String},
    TELEFONO:{type: String},
    FEC_NAC:{type: String},
    GENERO:{type: String},
    ESTADO:{type: String},
    CORREO:{type: String},
},'per_persona');

module.exports={Persona};
