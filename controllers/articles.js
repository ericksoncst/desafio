const redis = require('redis');
const client = redis.createClient();
const { checkId } = require('../validation/checkId');

const Article = require('../models/Articles');
const validateArticlesInput  = require('../validation/article');


exports.create_article = async (req, res) => {   
    const newArticle = new Article({
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        author: req.user.name,
        user:  req.user.id
    });

    const {errors, isValid} = validateArticlesInput(req.body);
    if(!isValid) return res.status(400).json(errors);
    
    await newArticle.save().then(article => res.json(article)); 
}

exports.articles_list = async (req, res) => {
    const { page, perPage} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
    }
    const articles = await Article.paginate({}, options);

    client.get('articles', (err, reply) => {
        if(reply){
            console.log('redis');
            res.json(JSON.parse(reply));
        }else{
            console.log('db');
            client.set('articles', JSON.stringify(articles));
            client.expire('articles', 20);
             return res.status(200).json(articles);
        }  
    });  
}

exports.article_by_id = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Article not found.'});

    let article = await Article.findById(req.params.id);
    if(!article) return res.status(404).json({msg: 'Article not found.'});
    res.json(article);
}

exports.article_update = async (req, res) => {
    if(checkId(req.params.id) === false)
    return res.status(404).json({msg: 'Article not found.'});

    let article = await Article.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if(!article) return res.status(404).json({msg: 'Article not found.'});
     
    res.json(article);
}

exports.delete_article = async (req, res) => {
    if(checkId(req.params.id) === false || null)
    return res.status(404).json({msg: 'Article not found.'});

    let article = await Article.findById(req.params.id);

    if(!article) return res.status(404).json({msg: 'Article not found.'});
    article.remove();

    res.json({success: true, msg: "Article excluded"});
}

exports.article_by_permalink = async (req,res) => {

    const permalink = req.params.permalink;
    const article = await Article.find({permalink});
    
    if(article.length === 0) return res.status(404).json({msg: 'Article not found.'});
    res.json(article);
}
