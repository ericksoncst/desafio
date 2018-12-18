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
    ]
}, {
    timestamps: true
});

ArtigoSchema.plugin(mongoosePaginate);
ArtigoSchema.plugin(URLSlugs('_id titulo', {field: 'permalink'}));
module.exports = Artigo = mongoose.model('artigos', ArtigoSchema);