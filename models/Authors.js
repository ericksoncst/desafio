const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

AuthorSchema.plugin(mongoosePaginate);
module.exports = Author = mongoose.model('author', AuthorSchema);