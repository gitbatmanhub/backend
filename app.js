'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar archivos de rutas



// middlewares

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());


//Cors


//Rutas
app.get('/', (req, res)=>{
    res.status(200).send(
        "<h2> Pagina de inicio</h2>"
    );

});


app.post('/test/:id', (req, res)=>{
    console.log(req.body.Name);
    console.log(req.query.web);
    console.log(req.params.id);

    res.status(200).send({
        message: "Hola mundo desde mi API js"
    });

});

//Exportar el modulo

module.exports = app;