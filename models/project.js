'use strict'

var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var ProjectSchema= Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String]

});

module.exports = mongoose.nodel('Projects', ProjectSchema);
