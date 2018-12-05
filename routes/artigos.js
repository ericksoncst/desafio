const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    criar_artigo, 
    listar_artigos, 
    artigo_by_id, 
    atualiza_artigo, 
    deleta_artigo,
    artigo_by_permalink,
} = require('../controllers/artigos')

router.post('/', passport.authenticate('jwt', { session: false}), criar_artigo);
router.get('/', listar_artigos);
router.get('/:id', artigo_by_id);
router.get('/permalink/:permalink', artigo_by_permalink);
router.put('/:id', atualiza_artigo);
router.delete('/:id', deleta_artigo);

module.exports = router; 
