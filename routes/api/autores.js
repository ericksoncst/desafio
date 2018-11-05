const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load validation
const validateRegisterInput = require('../../validation/cadastro');
const validateLoginInput = require('../../validation/login');


 //load autor model
const Autor = require('../../models/Autor');

//@route http://localhost:5000/api/autores/cadastro
//POST cadastro do autor
router.post('/cadastro' ,(req, res)=> {

    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
       return res.status(400).json(errors);
    }

    Autor.findOne({ email : req.body.email })
    .then(autor => {

        if(autor){
            errors.email = "Este email já está em uso!!";
            return res.status(400).json(errors);
        } else {           
             const novoAutor = new Autor({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            });
       
             bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(novoAutor.senha, salt, (err, hash) => {
                    if(err) throw err;
                    novoAutor.senha = hash;
                    novoAutor.save()
                    .then(autor => res.json(autor))
                    .catch(err =>  console.log(err));
                    
                });
            });
        }
    } );
});

//@route http://localhost:5000/api/autores/login
//POST login do autor
router.post('/login', (req,res) => {

    const {errors, isValid} = validateLoginInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const senha = req.body.senha;

    Autor.findOne({email})
    .then(autor => {

        if(!autor){
            errors.email = "Email não encontrado!";
            res.status(404).json(errors);
        }

        bcrypt.compare(senha, autor.senha)
        .then(isMatch => {
            if(isMatch){
                
            const payload = { id: autor.id, nome: autor.nome} 

            jwt.sign(
                payload, 
                keys.secretOrKey, 
                { expiresIn: 3600 }, 
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
            });

            } else {
                return res.status(400).json({senha : "Senha incorreta!!"});
            }
        });
    });
});

//@route http://localhost:5000/api/autores
//GET listando autores/ opção de paginação
router.get('/', async (req, res) => {
	try{
		const { pagina, porPagina} = req.query;
		const opcoes = {
			page: parseInt(pagina, 10) || 1,
			limit: parseInt(porPagina, 10) || 10,
		}
		const autores = await Autor.paginate({}, opcoes);
		return res.json(autores);
	} catch (err){
		console.error(err);
		return res.status(500).send(err);
	}
});

//@route http://localhost:5000/api/autores/atual
//GET autor logado
router.get('/atual', 
passport.authenticate('jwt', 
{ session: false}), 
(req, res) => {
    //res.json({msg: 'success'});
    res.json({
        id: req.user.id,
        nome: req.user.nome,
        email: req.user.email,
    });
});

//@route http://localhost:5000/api/autores/:id
//PUT atualizando autor
router.put('/:id' , (req, res) => {
    const id = req.params.id;
    Autor.update(
        { '_id': id },
        { $set:  { 'nome': req.body.nome }},
        (err, result) => {
          if (err) {
            res.status(500)
            .json({ error: 'Não foi possivel atualizar autor'});
          } else {
            res.status(200)
            .json(result);
          }
       }
      );
});


//@route http://localhost:5000/api/autores/:id
//DELETE deletando autor
router.delete('/:id',(req, res) => {
    const id = req.params.id;
    Autor.findById({_id: id})
    .then(autor => {
    autor.remove().then(() => res.json({ msg: "Autor excluido com sucesso" }));
    })
    .catch(err => res.status(404).json({ msg: 'Autor não encontrado' }));
});


 module.exports = router; 