const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const redis = require('redis');
const client = redis.createClient();

const Artigo = require('../../models/Artigo');

//@route http://localhost:5000/api/artigos
//POST novo artigo 
router.post('/', passport.authenticate('jwt', { session: false}),
(req, res) => {   
    const novoArtigo = new Artigo({
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        conteudo: req.body.conteudo,
        autor: req.user.nome,
        id_user:  req.user.id
    });
    
    novoArtigo.save().then(artigo => res.json(artigo)
    .catch(err =>  console.log(err)));
       
});

//@route http://localhost:5000/api/artigos
//GET listando artigos/paginação
router.get('/', async (req, res) => {
    const { pagina, porPagina} = req.query;
    const opcoes = {
        page: parseInt(pagina, 10) || 1,
        limit: parseInt(porPagina, 10) || 10,
    }
    const artigos = await Artigo.paginate({}, opcoes);

	try{
		client.get('artigos', (err, reply) => {
            if(reply){
                console.log('redis');
                res.json(JSON.parse(reply));
            }else{
                console.log('db');
                client.set('artigos', JSON.stringify(artigos));
                client.expire('artigos', 20);
                return res.json(artigos);
            }
        });
		
	} catch (err){
		console.error(err);
		return res.status(500).send(err);
	}
});

//@route http://localhost:5000/api/artigos/:id
//GET consultar artigo por id
router.get('/:id', (req, res) => {
    Artigo.findById(req.params.id)
      .then(artigo => {
        if (artigo) {
          res.json(artigo);
        } else {
          res.status(404).json({ msg: 'Nenhum artigo encontrado' })
        }
      })
      .catch(err =>
        res.status(404).json({ msg: 'Nenhum artigo encontrado' })
    );
});

//@route http://localhost:5000/api/artigos/:id
//PUT atualizando artigo por id
router.put('/:id',	(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Artigo.findByIdAndUpdate(req.params.id, req.body, {new : true})
            .then(artigo => {
                if (artigo) {
                    res.json(artigo);
                } else {
                res.status(404).json({ msg: 'Nenhum artigo encontrado' })
                }
        
                artigo.save().then(artigo => res.json(artigo))
                .catch(err => res.status(404).json({ msg: 'Artigo não encontrado' }));
        });
    }else{
        res.status(404).json({ msg: 'Nenhum artigo encontrado' });
    }
});


//@route http://localhost:5000/api/artigos/:id
//DELETE deletando artigo
router.delete('/:id',(req, res) => {
    const id = req.params.id;
    Artigo.findById({_id: id})
    .then(artigo => {
    artigo.remove().then(() => res.json({ msg: "Artigo excluido com sucesso" }));
    })
    .catch(err => res.status(404).json({ msg: 'Artigo não encontrado' }));
});

module.exports = router; 