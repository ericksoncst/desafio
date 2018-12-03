const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongoosePaginate = require('mongoose-paginate');
const config = require('config');

const Schema = mongoose.Schema;

const AutorSchema = Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
    }
});

AutorSchema.methods.generateAuthToken = function() { 
    const token = jwt
    .sign({ _id: this._id, nome: this.nome , senha : this.senha}, config.get('jwtPrivateKey'));
    return token;
  }

AutorSchema.plugin(mongoosePaginate);
module.exports = Autor = mongoose.model('autores', AutorSchema);