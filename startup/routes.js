const express = require('express');
const autores = require('../routes/autores');
const artigos = require('../routes/artigos');
const comentarios = require('../routes/comentarios');
const error = require('../midlleware/error');


module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/autores', autores);
    app.use('/api/artigos', artigos);
    app.use('/api/comentarios', comentarios);
    app.use(error);
  }
