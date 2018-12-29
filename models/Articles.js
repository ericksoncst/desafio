const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const mongoosePaginate = require('mongoose-paginate');

const ArticleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'author'
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [
        {
          id_user: {
            type: String,
            ref: 'author'
          },
          text: {
            type: String,
            required: true
          },
          name: {
              type: String,
              required: true
          }
        }
    ]
}, {
    timestamps: true
});

ArticleSchema.plugin(mongoosePaginate);
ArticleSchema.plugin(URLSlugs('_id title', {field: 'permalink'}));
module.exports = Article = mongoose.model('article', ArticleSchema);