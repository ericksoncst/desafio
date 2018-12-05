const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const mongoosePaginate = require('mongoose-paginate');

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
            type: String,
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
ArtigoSchema.plugin(URLSlugs('_id titulo', {field: 'permalink'}));
module.exports = Artigo = mongoose.model('artigos', ArtigoSchema);