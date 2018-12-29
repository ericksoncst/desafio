const express = require('express');
const authors = require('../routes/authors');
const articles = require('../routes/articles');
const comments = require('../routes/comments');
const error = require('../midlleware/error');


module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/authors', authors);
    app.use('/api/articles', articles);
    app.use('/api/comments', comments);
    app.use(error);
  }
