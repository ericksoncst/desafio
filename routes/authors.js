const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    register,
    login,
    authors_list,
    author_by_id,
    update_author,
    delete_author
} = require('../controllers/authors')

router.post('/register', register);
router.post('/login', login);
router.get('/', authors_list);
router.get('/:id', author_by_id);
router.put('/:id', update_author);
router.delete('/:id', passport.authenticate('jwt', { session: false}), delete_author);

module.exports = router; 
