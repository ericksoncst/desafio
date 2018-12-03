const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    criar_comentario,
    lista_comentarios_artigo,
    atualiza_comentario,
    deleta_comentario
} = require('../controllers/comentarios');


router.post('/:id', passport.authenticate('jwt', { session: false}), criar_comentario);

router.get('/:id', lista_comentarios_artigo);

router.put('/:id', atualiza_comentario);

router.delete('/:id/:comentario_id', 
passport.authenticate('jwt', { session: false }), deleta_comentario);


module.exports = router;