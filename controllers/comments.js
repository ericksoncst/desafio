const { checkId } = require('../validation/checkId');
// const _ = require('lodash');


const Article = require('../models/Articles');


exports.create_comment = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Article not found.'});

    let article = await Article.findById(req.params.id);
    if(!article) return res.status(404).json({msg: 'Article not found.'});

    let newComment = {
        text: req.body.text,
        name: req.user.name,
        id_user: req.user.id
    };

    article.comments.unshift(newComment);
    article.save();
    res.json(article);
}

exports.comments_list_by_article = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Article not found.'});

    let article = await Article.findById(req.params.id).select('comments');
    if(!article) return res.status(404).json({msg: 'Article not found'});

    res.json(article)
}

exports.update_comment = (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Comment not found.'});

    Article.update(
        { 'comments._id': req.params.id },
        { $set:  { 'comments.$.text': req.body.text }},
        (err, result) => {
          if (err) {
            res.status(500)
            .json({ error: 'Was not possible to update this comment'});
          } else {
            res.status(200)
            .json(result);
          }
       }
      );
  }

  exports.delete_comment = (req, res) => {
    Article.findById(req.params.id)
      .then(article => {
          if(article.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
              ).length === 0
          ){
              res
          .status(404)
          .json({ msg: 'Comment not found' });
          } 

          const removeIndex = article.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

          article.comments.splice(removeIndex, 1);
          article.save().then(article => res.json({msg: 'Comment excluded'}));
      })
      .catch(err => res.status(404).json({ msg: 'Article or comment not found' }));
  }