const express = require('express');
const router = express.Router();

//load controller
const autoresController = require('../../controllers/autores')

 //load autor model
const Autor = require('../../models/Autor');

//@route http://localhost:5000/api/autores/cadastro
//POST cadastro do autor
router.post('/cadastro' ,autoresController.cadastro);

//@route http://localhost:5000/api/autores/login
//POST login do autor
router.post('/login', autoresController.login);

//@route http://localhost:5000/api/autores
//GET listando autores/ opção de paginação
router.get('/', autoresController.lista_autores);

//@route http://localhost:5000/api/autores/:id
//GET consultar autor por id
router.get('/:id', autoresController.autor_by_id);

//@route http://localhost:5000/api/autores/:id
//PUT atualizando autor
router.put('/:id',	autoresController.atualiza_autor);


//@route http://localhost:5000/api/autores/:id
//DELETE deletando autor
router.delete('/:id', autoresController.deleta_autor);

 module.exports = router; 