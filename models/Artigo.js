const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

var id = mongoose.Types.ObjectId();


//criando schema
const ArtigoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'autores'
    },
    autor: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    comentarios: [
        {
          id_user: {
            type: Schema.Types.ObjectId,
            ref: 'autores'
          },
          texto: {
            type: String,
            required: true
          },
          nome: {
              type: String,
              required: true
          }
        }
    ],
    data_criacao: {
        type: Date,
        default: Date.now
    },
    data_atualizacao: {
        type: Date,
        default: Date.now
    }
});

ArtigoSchema.pre('save', function(next) {
    this.data_atualizacao = Date.now();
    return next();
});

ArtigoSchema.plugin(mongoosePaginate);
module.exports = Artigo = mongoose.model('artigos', ArtigoSchema);