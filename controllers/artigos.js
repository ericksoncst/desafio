const redis = require('redis');
const client = redis.createClient();
const { verificaId } = require('../validation/objectId');

const Artigo = require('../models/Artigos');
const validaInputArtigo = require('../validation/artigo');


exports.criar_artigo = async (req, res) => {   
    const novoArtigo = new Artigo({
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        conteudo: req.body.conteudo,
        autor: req.user.nome,
        user:  req.user.id
    });

    const {errors, isValid} = validaInputArtigo(req.body);
    if(!isValid) return res.status(400).json(errors);
    
    await novoArtigo.save().then(artigo => res.json(artigo)); 
}

exports.listar_artigos = async (req, res) => {
    const { pagina, porPagina} = req.query;
    const opcoes = {
        page: parseInt(pagina, 10) || 1,
        limit: parseInt(porPagina, 10) || 10,
    }
    const artigos = await Artigo.paginate({}, opcoes);

    client.get('artigos', (err, reply) => {
        if(reply){
            console.log('redis');
            res.json(JSON.parse(reply));
        }else{
            console.log('db');
            client.set('artigos', JSON.stringify(artigos));
            client.expire('artigos', 20);
             return res.status(200).json(artigos);
        }  
    });  
}

exports.artigo_by_id = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'Artigo não encontrado.'});

    let artigo = await Artigo.findById(req.params.id);
    if(!artigo) return res.status(404).json({msg: 'Artigo não encontrado.'});
    res.json(artigo);
}

exports.atualiza_artigo = async (req, res) => {
    if(verificaId(req.params.id) === false)
    return res.status(404).json({msg: 'artigo não encontrado.'});

    let artigo = await Artigo.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if(!artigo) return res.status(404).json({msg: 'Artigo não encontrado.'});
     
    res.json(artigo);
}

exports.deleta_artigo = async (req, res) => {
    if(verificaId(req.params.id) === false || null)
    return res.status(404).json({msg: 'Artigo não encontrado.'});

    let artigo = await Artigo.findById(req.params.id);

    if(!artigo) return res.status(404).json({msg: 'Artigo não encontrado.'});
    artigo.remove();

    res.json({success: true, msg: "Artigo excluido com sucesso"});
}

exports.artigo_by_permalink = async (req,res) => {

    const permalink = req.params.permalink;
    const artigo = await Artigo.find({permalink});
    
    if(artigo.length === 0) return res.status(404).json({msg: 'Artigo não encontrado.'});
    res.json(artigo);
}
