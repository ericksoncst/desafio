const Validator = require('validator');
const isEmpty = require('./is-empty');

 module.exports = function validateArticlesInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.subtitle = !isEmpty(data.subtitle) ? data.subtitle : '';
    data.content = !isEmpty(data.content) ? data.content : '';
  
    if (!Validator.isLength(data.title, { min: 5, max: 30 })) {
      errors.title = "Title field must be between 5 and 30 characters!";
    }
  
    if (Validator.isEmpty(data.title)) {
      errors.title = 'Title is required';
    }

    if (!Validator.isLength(data.subtitle, { min: 5, max: 15 })) {
        errors.subtitle = "Subtitle field must be between 5 and 30 characters!";
    }

    if (Validator.isEmpty(data.subtitle)) {
        errors.subtitle = 'Subtitle is required!';
    }
  
    if (!Validator.isLength(data.content, { min: 10, max: 300 })) {
        errors.content = "Content field must be between 5 and 30 characters!";
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = 'Content is required!';
    }
  

    return {
        errors,
        isValid: isEmpty(errors)
    };


}; 