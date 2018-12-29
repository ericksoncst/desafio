const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    create_comment,
    comments_list_by_article,
    update_comment,
    delete_comment
} = require('../controllers/comments');


router.post('/:id', passport.authenticate('jwt', { session: false}), create_comment);

router.get('/:id', comments_list_by_article);

router.put('/:id', update_comment);

router.delete('/:id/:comment_id', 
passport.authenticate('jwt', { session: false }), delete_comment);


module.exports = router;