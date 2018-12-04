const request = require('supertest');
const Autor = require('../models/Autores');
const mongoose = require('mongoose');
let server,token, _id;


describe('/api/autores', () => {

    beforeAll(async () => { server = require('../app'); });    

    afterAll(async () => { 
        server.close(); 
        await Autor.collection.drop();
    });

describe('POST /autores/cadastro', function () {
    let data = {
        "nome": "TESTE",
        "email": "suit_tests@suit.com",
        "senha": "testes",
        "senha2": "testes"
    }

    it('Deve retornar status 200.', function (done) {
        request(server)
            .post('/api/autores/cadastro')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                _id = res.body._id;
                done();
            });
    });
});

describe('POST /autores/login', function () {
    let data = {
        "email": "suit_tests@suit.com",
        "senha": "teste",
    }

    it('Deve retornar status 400 e mensagem de senha inválida', function (done) {
        request(server)
            .post('/api/autores/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({msg: 'Senha incorreta.'})
            .end((err,res) => {
                if (err) return done(err);
                token = res.body;
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
            .end((err,res) => {
                if (err) return done(err);
                token = res.body;
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
    it('Deve retornar status 404, id errado', function (done) {
        request(server)
            .get('/api/autores/98027889')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

describe('GET /autores/:id', function () {
    it('Deve retornar um Json com o Autor', function (done) {
        const url = '/api/autores/' + _id;
        request(server)
            .get(url)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                "_id": _id,
                "nome": "TESTE",
                "email": "suit_tests@suit.com",
            })
            .expect(200, done);
    });
});


describe('PUT /autores', function () {
    let data = {
        "email": "suit_tests@suit.com",
        "senha": "testes88",
    }

    it('Deve retornar status 401', function (done) {
        request(server)
            .put('/api/autores/8883938')
            .send(data)
            .set('Accept', 'application/json')
            .expect(401)
            .expect('Unauthorized')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('PUT /autores', function () {
    let data = {
        "email": "suit_tests@suit.com",
        "senha": "testes88",
    }

    it('Deve retornar status 200', function (done) {
        const url = '/api/autores/' + _id;
        request(server)
            .put(url)
            .send(data)
            .set('Accept', 'application/json')
            .set('Authorization', `${token}`)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /autores/:id', function () {
    it('Deve retornar status 404 e mensagem de erro!', function (done) {
     request(server)
            .delete('/api/autores/89789')
            .set('Accept', 'application/json')
            .set('Authorization', `${token}`)
            .expect(404, done);
    });
});

describe('DELETE /autores/:id', function () {
    it('Deve retornar status 200 e mensagem de excluido com sucesso!', function (done) {
        const url = '/api/autores/' + _id;
     request(server)
            .delete(url)
            .set('Accept', 'application/json')
            .set('Authorization', `${token}`)
            .expect({
                "success": true,
                "msg": "Autor excluido com sucesso"
            })
            .expect(200, done);
    });
});


});