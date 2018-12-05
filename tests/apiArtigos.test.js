const request = require('supertest');
const Autor = require('../models/Autores');
const Artigo = require('../models/Artigos');
let server,token, _id, id_artigo;


describe('Suit test api/artigos', () => {

    beforeAll(() => { server = require('../app'); 

        
    describe('POST /autores/cadastro', function () {
        let data = {
            "nome": "TESTE",
            "email": "suit_tests2@suit.com",
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
            "email": "suit_tests2@suit.com",
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

    });    

    afterAll(async () => { 
        server.close(); 
        await Autor.collection.drop();
        await Artigo.collection.drop();
    });


    describe('POST /autores/cadastro', function () {
        let data = {
            "nome": "TESTE",
            "email": "suit_tests2@suit.com",
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
            "email": "suit_tests2@suit.com",
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

    describe('POST /artigos', function () {
        let data = {
            "titulo": "Titulo teste",
            "subtitulo": "sub teste",
            "conteudo": "conteudo teste",
        };
    
        it('Deve retornar status 200', function (done) {
            request(server)
                .post('/api/artigos')
                .send(data)
                .set('Accept', 'application/json')
                .set('Authorization', `${token}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    id_artigo =  res.body._id;
                    done();
                });
        });
    });

    describe('POST /artigos', function () {
        let data = {
            "titulo": "",
            "subtitulo": "",
            "conteudo": "",
        };
    
        it('Deve retornar status 400', function (done) {
            request(server)
                .post('/api/artigos')
                .send(data)
                .set('Accept', 'application/json')
                .set('Authorization', `${token}`)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /artigos', function () {
        it('Deve retornar Json com lista de artigos', function (done) {
            request(server)
                .get('/api/artigos')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('PUT /artigos/:id', function () {
        let data = {
            "titulo": "Titulo teste modificado",
            "subtitulo": "sub teste modificado",
        };

        it('Deve retornar status 200', function (done) {
            let url = '/api/artigos/' + id_artigo;
            request(server)
                .put(url)
                .send(data)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('DELETE /artigos/:id', function () {
        it('Deve retornar status 200!', function (done) {
            let url = '/api/artigos/' + id_artigo;
        request(server)
                .delete(url)
                .set('Accept', 'application/json')
                .expect(200, done);
        });
    });
    


    
});    