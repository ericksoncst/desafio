const mongoose = require('mongoose');

module.exports.verificaId = function(id){
    let valido = false;
    let objId = mongoose.Types.ObjectId.isValid(id);
    if(!objId) return valido;
    else valido = true;
}