//load model
const Artigo = require('../models/Artigo');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.criar_comentario = (req, res) => {
  
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
}

exports.comentario_by_id = (req, res) => {
    Artigo.findById(req.params.id)
      .select('comentarios')
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