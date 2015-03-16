/**
 * Created by alphyon on 03-15-15.
 */
//importando los paquetes necesarios
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//iniciando el modulo express
var app = express();

//configurando app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//puerto de aplicacion
var port = process.env.PORT || 3000;

//conectandose a la base de datos
mongoose.connect('mongodb://127.0.0.1/apiconferencia');


var Speaker = require('./server/models/speaker');

//definiendo las rutas

//iniciando el objeto de las rutas
var router = express.Router();

router.use(function(req,res, next){
    console.log('Una accion ha ocurrido en el servidor');
    next();
});

router.get('/', function(req, res){
    res.json({message: 'Hola SPA, la API esta Funcionando!!!!'});
});

router.route('/speakers')
    .post(function(req,res){
        var speaker = new Speaker();
        speaker.name = req.body.name;
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.schedule;

        speaker.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Conferencista creado'});
        });
    });

router.route('/speakers')
    .get(function(req,res){
        Speaker.find(function(err,speakers){
            if(err)
                res.send(err);
            res.json(speakers);
        });
    });

router.route('/speakers/:speaker_id').get(function(req,res){
    Speaker.findById(req.params.speaker_id,function(err,speaker){
        if(err)
            res.send(err);

        res.json(speaker);
    });
});

router.route('/speakers/:speaker_id').put(function(req,res){
    Speaker.findById(req.params.speaker_id,function(err,speaker){
        if(err)
            res.send(err);
        speaker.name = req.body.name;
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.schedule;

        speaker.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'conferencista actualizado'});
        });
    });
});

router.route('/speakers/:speaker_id').delete(function(req,res){
    Speaker.remove({
        _id: req.params.speaker_id
    },function(err, speaker){
        if(err)
            res.send(err);

        res.json({message:'Conferencista Eliminado'});
    });
});

//registrando rutas
app.use('/api',router);


//iniciando el servidor
app.listen(port);
console.log('Iniciando servidor en puerto: '+ port);
