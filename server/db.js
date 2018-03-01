'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mywritersdb', {useMongoClient: true});

module.exports = mongoose;
