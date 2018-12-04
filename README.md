# Desafio Webedia

# ******* AVISO *********

### Se você está útilizando Mac ou Linux,troque o script do package.json de:

```
"scripts": {
    "start": "SET \"NODE_ENV=development\" && nodemon app",
    "test": "SET \"NODE_ENV=test\" && jest --watchAll --verbose"
  }
``` 


### Para:

```
"scripts": {
    "start": "NODE_ENV=development nodemon app",
    "test": "NODE_ENV=test jest --watchAll --verbose"
  }
``` 

## Instruções para rodar a api


Primeiramente,pegue o arquivo dump/webedia e restaure o banco:

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

# Finalmente

```
npm start
```

## Para rodar testes


Instale as dependêndias do projeto,se não tiver feito e antes de dar o comando test,rode o redis e o mongo.

```
 redis-server
```

```
 mongod
```

# Então:

```
npm test
```
