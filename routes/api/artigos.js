const express = require('express');
const router = express.Router();
const passport = require('passport');

//load controller
const artigoController = require('../../controllers/artigos');


//@route http://localhost:5000/api/artigos
//POST novo artigo 
router.post('/', passport.authenticate('jwt', { session: false}),
artigoController.criar_artigo);

//@route http://localhost:5000/api/artigos
//GET listando artigos/paginação
router.get('/', artigoController.lista_artigos);

//@route http://localhost:5000/api/artigos/:id
//GET consultar artigo por id
router.get('/:id', artigoController.artigo_by_id);

//@route http://localhost:5000/api/artigos/:id
//PUT atualizando artigo por id
router.put('/:id',	artigoController.atualiza_artigo);


//@route http://localhost:5000/api/artigos/:id
//DELETE deletando artigo
router.delete('/:id', artigoController.deleta_artigo);

module.exports = router; 