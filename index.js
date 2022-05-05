'use strict'
const cors = require('cors')
var mongoose = require('mongoose');
var app= require('./app');
var port = 3700;

app.use(cors())


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(()=>{
            console.log("Conexión a la DDBB establecida con satisfatoriamente");
            //Creación del server
            app.listen(port, ()=>{
                console.log("Server corriendo correctamente en el puerto 3700");
            })
        })
        .catch(err => console.log(err));



