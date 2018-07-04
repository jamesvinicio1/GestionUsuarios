const express=require("express");
const bodyParser=require("body-parser");
const { mongoose } = require("./db.js");

var personaController=require('./controller/personaController.js');

var app= express();
app.use(bodyParser.json());
app.listen(3000,()=>console.log("Servidor iniciado NODE:3000 -- localhost:3000"));

app.use('/persona',personaController);