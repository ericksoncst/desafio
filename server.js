const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const autores = require('./routes/api/autores');
const artigos = require('./routes/api/artigos');
const comentarios = require('./routes/api/comentarios');
const mongoURL = 'mongodb://erickdb:password1@ds147391.mlab.com:47391/desafio';

mongoose.connect(mongoURL, { useNewUrlParser: true })
.then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.use(passport.initialize());
require('./config/passport.js')(passport);

app.use('/api/autores', autores);
app.use('/api/artigos', artigos);
app.use('/api/comentarios', comentarios);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));