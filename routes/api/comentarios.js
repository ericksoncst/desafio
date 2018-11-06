const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Artigo = require('../../models/Artigo');

//@route http://localhost:5000/api/comentarios/:artigo_id
//POST criando comentarios
router.post('/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
  
      Artigo.findById(req.params.id)
        .then(artigo => {
          const novoComentario = {
            texto: req.body.texto,
            nome: req.user.nome,
            user: req.user.id
          };
  
          artigo.comentarios.unshift(novoComentario);
          artigo.save().then(artigo => res.json(artigo));
        })
        .catch(err => res.status(404).json({ msg: 'Nenhum artigo encontrado' }));
});

//@route http://localhost:5000/api/comentarios
//GET listando comentarios/ opção de paginação
router.get('/', async (req, res) => {
	try{
		const { pagina, porPagina} = req.query;
		const opcoes = {
			page: parseInt(pagina, 10) || 1,
            limit: parseInt(porPagina, 10) || 10,
            select:   'comentarios'
		}
		const comentarios = await Artigo.paginate({}, opcoes);
		return res.json(comentarios);
	} catch (err){
		console.error(err);
		return res.status(500).send(err);
	}
});

//@route http://localhost:5000/api/comentarios/:comentario_id
//PUT atualizando comentario
router.put('/:id' , (req, res) => {
    Artigo.update(
        { 'comentarios._id': req.params.id },
        { $set:  { 'comentarios.$.texto': req.body.texto }},
        (err, result) => {
          if (err) {
            res.status(500)
            .json({ error: 'Não foi possivel atualizar comentario'});
          } else {
            res.status(200)
            .json(result);
          }
       }
      );
});



//@route http://localhost:5000/api/comentarios/:artigoId/:comentarioId
//DELETE deletando comentarios
router.delete(
    '/:artigo_id/:comentario_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Artigo.findById(req.params.id)
        .then(artigo => {
            if(artigo.comentarios.filter(
                comentario => comentario._id.toString() === req.params.comentario_id
                ).length === 0
            ){
                res
            .status(404)
            .json({ msg: 'Comentario não existe' });
            } 

            const removeIndex = artigo.comentarios
            .map(item => item._id.toString())
            .indexOf(req.params.comentario_id);

            artigo.comentarios.splice(removeIndex, 1);
            artigo.save().then(artigo => res.json(artigo));
        })
        .catch(err => res.status(404).json({ msg: 'Nenhum artigo ou comentario encontrado' }));
    }
  );

module.exports = router; 