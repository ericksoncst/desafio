const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//const autores = require('./routes/api/autores');

mongoose.connect('mongodb://localhost:27017/desafio_webedia', { useNewUrlParser: true })
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


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));