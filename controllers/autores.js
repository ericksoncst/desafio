const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const mongoose = require('mongoose');

//load model 
const Autor = require('../models/Autor');

//load validation
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/cadastro');


exports.cadastro = (req, res)=> {

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
}

exports.login = (req,res) => {

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
}

exports.lista_autores = async (req, res) => {
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
}

exports.autor_by_id = (req, res) => {
    Autor.findById(req.params.id)
      .then(autor => {
        if (autor) {
          res.json(autor);
        } else {
          res.status(404).json({ msg: 'Nenhum autor encontrado' })
        }
      })
      .catch(err =>
        res.status(404).json({ msg: 'Nenhum autor encontrado' })
    );
}

exports.atualiza_autor = (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Autor.findByIdAndUpdate(req.params.id, req.body, {new : true})
            .then(autor => {
                if (autor) {
                    res.json(autor);
                } else {
                res.status(404).json({ msg: 'Nenhum autor encontrado' })
                }
        
                autor.save().then(autor => res.json(autor))
                .catch(err => res.status(404).json({ msg: 'Autor não encontrado' }));
        });
    }else{
        res.status(404).json({ msg: 'Nenhum autor encontrado' });
    }
}

exports.deleta_autor = (req, res) => {
    const id = req.params.id;
    Autor.findById({_id: id})
    .then(autor => {
    autor.remove().then(() => res.json({ msg: "Autor excluido com sucesso" }));
    })
    .catch(err => res.status(404).json({ msg: 'Autor não encontrado' }));
}