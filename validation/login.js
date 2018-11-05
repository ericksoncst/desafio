const Validator = require('validator');
const isEmpty = require('./is-empty');
 module.exports = function validateLoginInput(data){
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.senha = !isEmpty(data.senha) ? data.senha : '';
  
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email invalido!!';
    }
     if (Validator.isEmpty(data.email)) {
      errors.email = 'Campo email é obrigatório!';
    }
  
    if (Validator.isEmpty(data.senha)) {
      errors.senha = 'Campo senha é obrigatório!';
    }
  
    return {
        errors,
        isValid: isEmpty(errors)
    };
};