const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


 //load autor model
const Autor = require('../../models/Autor');


router.post('/cadastro' ,(req, res)=> {
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




 module.exports = router; 