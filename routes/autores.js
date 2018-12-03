const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    cadastro,
    login,
    lista_autores,
    autor_by_id,
    atualiza_autor,
    deleta_autor
} = require('../controllers/autores')

router.post('/cadastro', cadastro);
router.post('/login', login);
router.get('/', lista_autores);
router.get('/:id', autor_by_id);
router.put('/:id', passport.authenticate('jwt', { session: false}), atualiza_autor);
router.delete('/:id', deleta_autor);

module.exports = router; 
