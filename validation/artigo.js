const Validator = require('validator');
const isEmpty = require('./is-empty');

 module.exports = function validaInputArtigo(data){
    let errors = {};

    data.titulo = !isEmpty(data.titulo) ? data.titulo : '';
    data.subtitulo = !isEmpty(data.subtitulo) ? data.subtitulo : '';
    data.conteudo = !isEmpty(data.conteudo) ? data.conteudo : '';
  
    if (!Validator.isLength(data.titulo, { min: 5, max: 30 })) {
      errors.titulo = "Campo titulo deve conter entre 5 a 30 caractéres!";
    }
  
    if (Validator.isEmpty(data.titulo)) {
      errors.titulo = 'Campo titulo é obrigatório!!';
    }

    if (!Validator.isLength(data.subtitulo, { min: 5, max: 15 })) {
        errors.subtitulo = "Campo subtitulo deve conter entre 5 a 15 caractéres!";
    }

    if (Validator.isEmpty(data.subtitulo)) {
        errors.subtitulo = 'Campo subtitulo é obrigatório!!';
    }
  
    if (!Validator.isLength(data.conteudo, { min: 10, max: 300 })) {
        errors.conteudo = "Campo conteudo deve conter no mínimo 10 caractéres!";
    }

    if (Validator.isEmpty(data.conteudo)) {
        errors.conteudo = 'Campo conteudo é obrigatório!!';
    }
  

    return {
        errors,
        isValid: isEmpty(errors)
    };


}; 