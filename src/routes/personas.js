const express = require('express');
const router = express.Router();

const Persona = require('../models/personaModel');

router.get('/', async (req, res) =>{
    const personas = await Persona.find();
    res.json(personas);
});

router.get('/:CEDULA', (req, res) => {
    Persona.find({"CEDULA": req.params.CEDULA }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/', async (req, res) => {
    const persona = new Persona(req.body);
    await persona.save();
    res.json({
        status: 'Persona Guardada'
    });
});

router.post('/', async (req, res) => {
    let persona = await Persona.findOne({CEDULA:req.body.CEDULA})
    Object.assign(persona, req.body)
    await persona.save()
    res.json({
        status: 'Persona Actualizada'
    });
});

router.delete('/', async (req, res) => {
    console.log(req.query);
   await Cliente.findByIdAndRemove(req.query);
   res.json({
    status:'Persona eliminada'
   });
});

module.exports = router;