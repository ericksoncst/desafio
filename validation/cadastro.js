const Validator = require('validator');
const isEmpty = require('./is-empty');

 module.exports = function validaInputCadastro(data){
    let errors = {};

    data.nome = !isEmpty(data.nome) ? data.nome : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.senha = !isEmpty(data.senha) ? data.senha : '';
    data.senha2 = !isEmpty(data.senha2) ? data.senha2 : '';
  
    if (!Validator.isLength(data.nome, { min: 2, max: 30 })) {
      errors.nome = "Campo nome deve conter entre 2 a 30 caractéres!";
    }
  
    if (Validator.isEmpty(data.nome)) {
      errors.nome = 'Campo nome é obrigatório!!';
    }
  
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Campo email é obrigatório!!';
    }
  
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Campo email invalido!!';
    }
  
    if (Validator.isEmpty(data.senha)) {
      errors.senha = 'Campo senha é obrigatório';
    }
  
    if (!Validator.isLength(data.senha, { min: 6, max: 30 })) {
      errors.senha = 'Campo senha deve conter no mínimo 6 catacteres';
    }
  
    if (Validator.isEmpty(data.senha2)) {
      errors.senha2 = 'Favor confirmar senha';
    } else {
      if (!Validator.equals(data.senha, data.senha2)) {
        errors.senha2 = 'Senha não confirma';
      }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };


}; 