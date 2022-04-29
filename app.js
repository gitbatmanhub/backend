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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//Rutas
app.use('/api', project_routes);





//Exportar el modulo

module.exports = app;