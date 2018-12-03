const redis = require('redis');
const client = redis.createClient();
const { verificaId } = require('../validation/objectId');
// const _ = require('lodash');


const Artigo = require('../models/Artigos');


exports.criar_comentario = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'Artigo não encontrado.'});

    let artigo = await Artigo.findById(req.params.id);
    if(!artigo) return res.status(404).json({msg: 'Artigo não encontrado.'});

    let novoComentario = {
        texto: req.body.texto,
        nome: req.user.nome,
        id_user: req.user.id
    };

    artigo.comentarios.unshift(novoComentario);
    artigo.save();
    res.json(artigo);
}

exports.lista_comentarios_artigo = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'Artigo não encontrado.'});

    let artigo = await Artigo.findById(req.params.id).select('comentarios');
    if(!artigo) return res.status(404).json({msg: 'Artigo não encontrado'});

    res.json(artigo)
}

exports.atualiza_comentario = (req, res) => {
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
  }

  exports.deleta_comentario = (req, res) => {
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
          artigo.save().then(artigo => res.json({msg: 'Comentario excluido'}));
      })
      .catch(err => res.status(404).json({ msg: 'Nenhum artigo ou comentario encontrado' }));
  }