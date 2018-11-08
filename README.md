# Desafio Webedia


## Instruções para rodar a api


Primeiramente,pegue o arquivo dump e restaure o banco:

```
 mongorestore --verbose \path\dump
```

Depois,instale as dependências do projeto:

```
 npm install
```

Antes de dar o comando start,rode o redis e o mongo.

```
 redis-server
```

```
 mongod
```

```
 mongo
```

# Finalmente

```
npm start
```