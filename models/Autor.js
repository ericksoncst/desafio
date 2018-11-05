const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

 // Criando Schema
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
        required: true
    }
});

AutorSchema.plugin(mongoosePaginate);
 module.exports = Autor = mongoose.model('autores', AutorSchema);