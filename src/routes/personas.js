const express = require('express');
const router = express.Router();
const http = require("http");
var arrayCompare = require("array-compare");

const Persona = require('../models/personaModel');

router.get('/', async (req, res) => {
    const personas = await Persona.find();
    res.json(personas);
    res.sendStatus();
});

router.get('/cedula/:CEDULA', (req, res) => {
    Persona.find({
        "CEDULA": req.params.CEDULA
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/codigo/:COD_PERSONA', (req, res) => {
    Persona.findOne({
        "COD_PERSONA": req.params.COD_PERSONA
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/', async (req, res) => {
    const persona = new Persona(req.body);
    await persona.save(), {
        versionKey: '_somethingElse'
    }
    res.status(200).send('200 OK')
});

router.post('/', async (req, res) => {
    let persona = await Persona.findOne({
        CEDULA: req.body.CEDULA
    })
    Object.assign(persona, req.body)
    await persona.save(), {
        versionKey: '_somethingElse'
    }
    res.status(200).send('200 OK')
});

router.delete('/:CEDULA', async (req, res) => {
    await Persona.remove({
        "CEDULA": req.params.CEDULA
    }, function (err) {
        res.json({
            status: 'Persona Eliminada'
        });
    });
});

router.get('/perfil/:perfil', function (req, resp) {
    var cod_perfil = req.params.perfil;
    var peraux = Persona.find();
    //    var jsonPersonas = [];
    var options = {
        host: '130.211.138.144',
        path: '/modulo-seguridades-web/webresources/SegUsuario/buscar/perfil/'.concat(cod_perfil)
    };

    var cedulas_seg;

    var req = http.get(options, async function (res) {
        var bodyChunks = [];
        var usuarios;

        res.on('data', function (chunk) {
            bodyChunks.push(chunk);
        }).on('end',  function () {
            var body = Buffer.concat(bodyChunks);
            usuarios = JSON.parse(body);
            console.log("-----------------------");
            var jsonPersonas = new Array();
            for (var item in usuarios) {
                //cedulas
                cedulas_seg = usuarios[item].cod_persona;
                //router.get('/cedula/:CEDULA', (req, res) => {
                 Persona.find({
                    "CEDULA": cedulas_seg
                }, (err, doc) => {
                    if (!err) {
                        if (doc.length != 0 ){
                            
                            jsonPersonas.push(doc[0]);
                            if (usuarios.length-1==item){
                                console.log(jsonPersonas);
                                //resp.contentType('application/json');
                                //resp.json(jsonPersonas);
                                //resp.contentType('application/json');
                            }
                        }
                        
                        //jsonPersonas[item] = doc;
                    } else {
                        console.log('Error :' + JSON.stringify(err, undefined, 2));
                    }
                });
                
            }
            resp.json(jsonPersonas);
            
            
        })
    });
    //return res.json('ok');

    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
});

module.exports = router;