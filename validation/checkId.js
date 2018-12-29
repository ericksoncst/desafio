const mongoose = require('mongoose');

module.exports.checkId = function(id){
    let valid = false;
    let objId = mongoose.Types.ObjectId.isValid(id);
    if(!objId) return valid;
    else valid = true;
}