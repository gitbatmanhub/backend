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
        "<h1>Página de Inicio</h1>"
    )

})

//Exportar el modulo

module.exports = app;