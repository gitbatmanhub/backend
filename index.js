'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(()=>{
            console.log("Conexión a la DDBB establecida con satisfatoriamente");
        })
        .catch(err => console.log(err));