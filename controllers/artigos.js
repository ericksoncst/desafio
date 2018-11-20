const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient();

//load model 
const Artigo = require('../models/Artigo');


exports.criar_artigo = 
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
       
}

exports.lista_artigos = async (req, res) => {
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
}

exports.artigo_by_id = (req, res) => {
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
}

exports.atualiza_artigo = (req, res) => {
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
}

exports.deleta_artigo = (req, res) => {
    const id = req.params.id;
    Artigo.findById({_id: id})
    .then(artigo => {
    artigo.remove().then(() => res.json({ msg: "Artigo excluido com sucesso" }));
    })
    .catch(err => res.status(404).json({ msg: 'Artigo não encontrado' }));
}