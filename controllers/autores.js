const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const redis = require('redis');
const client = redis.createClient();
const { verificaId } = require('../validation/objectId');

const Autor = require('../models/Autores');
const validaInputCadastro = require('../validation/cadastro');
const validaInputLogin = require('../validation/login');


exports.cadastro = async (req, res)=> {

    const {errors, isValid} = validaInputCadastro(req.body);
    if(!isValid) return res.status(400).json(errors);
 
    let autor = await Autor.findOne({ email: req.body.email });
    if (autor) return res.status(400).json('Email já registrado.');
              
    autor  = new Autor(_.pick(req.body, ['nome', 'email', 'senha']));
    const salt = await bcrypt.genSalt(10);
    autor.senha = await bcrypt.hash(autor.senha, salt);

    await autor.save()
    .then(autor => res.json(_.pick(autor, ['_id','nome', 'email'])));
}

exports.login = async (req, res) => {

    const {errors, isValid} = validaInputLogin(req.body);
    if(!isValid) return res.status(400).json(errors);

    let user = await Autor.findOne({email: req.body.email });
    if (!user) return res.status(400).json({msg: 'Email não encontrado.'});

    const senhaValida = await bcrypt.compare(req.body.senha, user.senha);
    if (!senhaValida) return res.status(400).json({msg: 'Senha incorreta.'});

    const payload = { id: user.id, nome: user.nome}
    const token = jwt.sign(payload, config.get('jwtPrivateKey') , {expiresIn: '1h'});    
    res.json('Bearer ' + token);
}

exports.lista_autores = async (req, res) => {
    const { pagina, porPagina} = req.query;
    const opcoes = {
        page: parseInt(pagina, 10) || 1,
        limit: parseInt(porPagina, 10) || 10,
        select: '_id nome email'
    }
    const autores = await Autor.paginate({}, opcoes);

    client.get('autores', (err, reply) => {
        if(reply){
            console.log('redis');
            res.json(JSON.parse(reply));
        }else{
            console.log('db');
            client.set('autores', JSON.stringify(autores));
            client.expire('autores', 20);
            return res.status(200).json(autores);
        }  
   });  
}

exports.autor_by_id = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'Autor não encontrado.'});

    let autor = await Autor.findById(req.params.id).select('_id nome email');
    if(!autor) return res.status(404).json({msg: 'Autor não encontrado.'});
    res.json(autor);
}

exports.atualiza_autor = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'Autor não encontrado.'});

    let autor = await Autor.findByIdAndUpdate(req.params.id, req.body, 
    {new : true}).select('_id email nome');

    if(!autor) return res.status(404).json({msg: 'Autor não encontrado.'});
    res.json(autor);
}

exports.deleta_autor = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'Autor não encontrado.'});

    if (req.params.id != req.user.id) 
    return res.status(401).json({msg: 'Não autorizado.'});

    let autor = await Autor.findByIdAndDelete(req.params.id);
    if(!autor) return res.status(404).json({msg: 'Autor não encontrado.'});
    
    res.json({success: true, msg: "Autor excluido com sucesso"});
}











