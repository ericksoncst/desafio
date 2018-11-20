const express = require('express');
const router = express.Router();
const passport = require('passport');

//load controller
const comentariosController = require('../../controllers/comentarios');

router.get('/', comentariosController.test);

//@route http://localhost:5000/api/comentarios/:artigo_id
//POST criando comentarios
router.post('/:id', passport.authenticate('jwt', { session: false }),
  comentariosController.criar_comentario);

//@route http://localhost:5000/api/comentarios/:artigo_id
//GET consultar todos os comentarios de um artigo
router.get('/:id', comentariosController.comentario_by_id);

//@route http://localhost:5000/api/comentarios/:comentario_id
//PUT atualizando comentario
router.put('/:id' , comentariosController.atualiza_comentario);


//@route http://localhost:5000/api/comentarios/:artigoId/:comentarioId
//DELETE deletando comentarios
router.delete('/:id/:comentario_id', passport.authenticate('jwt', { session: false }),
  comentariosController.deleta_comentario);

module.exports = router; 