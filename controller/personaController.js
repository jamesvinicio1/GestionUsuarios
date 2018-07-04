const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Persona } = require('../models/persona');

//BUSCAR A UNA PERSONA POR SU NUMERO DE CEDULA
router.get('/:CEDULA', (req, res) => {
    Persona.find({ "CEDULA": req.params.CEDULA }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error :' + JSON.stringify(err, undefined, 2)); }
    });
});

//BUSCAR A TODAS LAS PERSONAS DE LA BASE DE DATOS
router.get('/', (req, res) => {
    Persona.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error :' + JSON.stringify(err, undefined, 2)); }
    });
});

//INSERTAR UNA PERSONA


module.exports = router;



/*
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);


    Cliente.findById(req.params.id, {
        $set: {
            cedula: req.body.cedula,
            nombre: req.body.nombre
        }
    }, { new: false }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Cliente Update :' + JSON.stringify(err, undefined, 2)); }
    });

});




router.delete('/:cedula', (req, res) => {


    Cliente.findOne({ "cedula": req.params.cedula }, (err, doc) => {
        if(doc===null)
        {
            Factura.find({ "cliente.cedula": req.params.cedula }, (err, doc) => {

                if (!err) { 
                    if (!ObjectId.isValid(doc.id))
                    Cliente.findByIdAndRemove(req.params.cedula, (err, doc) => {
                        if (!err) { res.send(doc); }
                        else { console.log('Error in Cliente Delete :' + JSON.stringify(err, undefined, 2)); }
                    });
                    else
                    return res.status(400).send(`Factura para : ${req.params.cedula}`);

                 }
                else { console.log('Error :' + JSON.stringify(err, undefined, 2)); }});
        }
        else
        {
            
            return res.status(404).send(`No encontrado : ${req.params.cedula}`);


        }
        
    });

   
});

*/