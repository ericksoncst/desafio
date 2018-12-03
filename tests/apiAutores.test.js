const request = require('supertest');
const Autor = require('../models/Autores');
const mongoose = require('mongoose');
let server;

describe('/api/autores', () => {

    beforeAll(async () => { server = require('../app'); 
    _id = mongoose.Types.ObjectId("507f191e810c19729de860ea");
    let autor = new  Autor(
        {_id: _id, nome: 'Ericktest', senha: 'testes', email: 'teste_suit2@test.com'},
    );
    autor.save();
    });

    beforeEach(async () => { server = require('../app'); 
    _id = mongoose.Types.ObjectId();
    let autor = new  Autor(
        {_id: _id, nome: 'Ericktest', senha: 'testes', email: 'teste_suit2@test.com'},
    );
    autor.save();
});

    afterAll(async () => { 
      server.close(); 
      await Autor.collection.drop();
    });

describe('POST /autores', function () {
    let data = {
        "nome": "TESTE",
        "email": "suit_tests@suit.com",
        "senha": "testes",
        "senha2": "testes"
    }

    it('Deve retornar status 200,nome e email do autor.', function (done) {
        request(server)
            .post('/api/autores/cadastro')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                "nome": "TESTE",
                "email": "suit_tests@suit.com"
            })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /autores/login', function () {
    let data = {
        "email": "suit_tests@suit.com",
        "senha": "testes",
    }

    it('Deve retornar status 200 e token', function (done) {
        request(server)
            .post('/api/autores/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


describe('POST /autores', function () {
    let data = {
        "nome": "TESTE",
        "email": "suit_tests3@suit.com",
        "senha": "testes",
        //"senha2": "testes"
    }

    it('Deve retornar status 400 com mensagem de confirmação de senha', function (done) {
        request(server)
            .post('/api/autores/cadastro')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({
                "senha2": "Favor confirmar senha"
            })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


describe('GET /autores', function () {
    it('Deve retornar Json com lista de autores', function (done) {
        request(server)
            .get('/api/autores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /autores/:id', function () {
    it('Deve retornar um Json com o Autor', function (done) {
        request(server)
            .get('/api/autores/507f191e810c19729de860ea')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                "_id": "507f191e810c19729de860ea",
                "nome": "Ericktest",
                "email": "teste_suit2@test.com",
            })
            .expect(200, done);
    });
});

describe('DELETE /autores/:id', function () {
    it('Deve retornar status 200 e mensagem de excluido com sucesso!', function (done) {
        request(server)
            .delete('/api/autores/507f191e810c19729de860ea')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                "success": true,
                "msg": "Autor excluido com sucesso"
            })
            .expect(200, done);
    });
});



});