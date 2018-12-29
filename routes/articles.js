const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    create_article, 
    articles_list, 
    article_by_id, 
    article_update, 
    article_by_permalink,
    delete_article,
} = require('../controllers/articles')

router.post('/', passport.authenticate('jwt', { session: false}), create_article);
router.get('/', articles_list);
router.get('/:id', article_by_id);
router.get('/permalink/:permalink', article_by_permalink);
router.put('/:id', article_update);
router.delete('/:id', delete_article);

module.exports = router; 
