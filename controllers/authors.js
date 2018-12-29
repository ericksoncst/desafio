const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const redis = require('redis');
const client = redis.createClient();
const { checkId } = require('../validation/checkId');

const Author = require('../models/Authors');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


exports.register = async (req, res)=> {

    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid) return res.status(400).json(errors);
 
    let author = await Author.findOne({ email: req.body.email });
    if (author) return res.status(400).json('Email already registered.');
              
    author  = new Author(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    author.password = await bcrypt.hash(author.password, salt);

    await author.save()
    .then(author => res.json(_.pick(author, ['_id','name', 'email'])));
}

exports.login = async (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) return res.status(400).json(errors);

    let user = await Author.findOne({email: req.body.email });
    if (!user) return res.status(400).json({msg: 'Email não encontrado.'});

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({msg: 'Invalid password.'});

    const payload = { id: user.id, name: user.name}
    const token = jwt.sign(payload, config.get('jwtPrivateKey') , {expiresIn: '1h'});    
    res.json('Bearer ' + token);
}

exports.authors_list = async (req, res) => {
    const { page, perPage} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        select: '_id name email'
    }
    const authors = await Author.paginate({}, options);

    client.get('authors', (err, reply) => {
        if(reply){
            console.log('redis');
            res.json(JSON.parse(reply));
        }else{
            console.log('db');
            client.set('authors', JSON.stringify(authors));
            client.expire('authors', 20);
            return res.status(200).json(authors);
        }  
   });  
}

exports.author_by_id = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Author not found.'});

    let author = await Author.findById(req.params.id).select('_id name email');
    if(!author) return res.status(404).json({msg: 'Author not found.'});
    res.json(author);
}

exports.update_author = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Author not found.'});

    let author = await Author.findByIdAndUpdate(req.params.id, req.body, 
    {new : true}).select('_id email name');

    if(!author) return res.status(404).json({msg: 'Author not found.'});
    res.json(author);
}

exports.delete_author = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Author not found.'});

    if (req.params.id != req.user.id) 
    return res.status(401).json({msg: 'Não authorizado.'});

    let author = await Author.findByIdAndDelete(req.params.id);
    if(!author) return res.status(404).json({msg: 'Author not found.'});
    
    res.json({success: true, msg: "author excluido com sucesso"});
}











