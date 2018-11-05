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

//login
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


 module.exports = router; 