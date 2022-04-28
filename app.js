'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar archivos de rutas

var project_routes = require('./routes/project')

// middlewares

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());


//Cors


//Rutas
app.use('/api', project_routes);





//Exportar el modulo

module.exports = app;