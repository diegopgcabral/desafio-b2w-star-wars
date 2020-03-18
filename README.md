<h1 align="center">
Desafio B2W - API REST Star Wars
</h1>

<h2 align="center">
  <img src="https://github.com/diegopgcabral/desafio-b2w-star-wars/blob/master/src/assets/logo.png" width="300px" />
</h2>

<h4 align="justify">
  <p>
    API REST foi desenvolvida para buscar as informações referente ao planetas dos filmes Star Wars.
  </p>
  <p>
    As informações dos planetas serão obtidas pela API pública do Star Wars: https://swapi.co/
  </p>
</h4>

<p align="center">
  <a href="https://circleci.com/gh/diegopgcabral/desafio-b2w-star-wars/tree/master"><img src="https://circleci.com/gh/diegopgcabral/desafio-b2w-star-wars/tree/master.svg?style=svg"/></a>
  <a href="https://www.codacy.com/manual/diegopgcabral/desafio-b2w-star-wars?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=diegopgcabral/desafio-b2w-star-wars&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/05d365f5eaf842a38d89c719b9559d8b"/></a>

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diegopgcabral/desafio-b2w-star-wars?color=%2304D361">

  <a href="https://www.linkedin.com/in/diego-pg-cabral/">
    <img alt="Made by Diego Cabral" src="https://img.shields.io/badge/made%20by-DiegoCabral-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a>
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/diegopgcabral/desafio-b2w-star-wars.svg">
  </a>

  <a href="https://github.com/diegopgcabral/desafio-b2w-star-wars/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/diegopgcabral/desafio-b2w-star-wars.svg">
  </a>
   <a href="https://github.com/diegopgcabral/desafio-b2w-star-wars/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/diegopgcabral/desafio-b2w-star-wars?style=social">
  </a>
</p>

## :rocket: Tecnologias

### :gear: BACK-END
-   [Node.js](https://nodejs.org/en/)
-   [Npm](https://www.npmjs.com/)
-   [Express](https://expressjs.com/)
-   [nodemon](https://nodemon.io/)
-   [Sucrase](https://github.com/alangpierce/sucrase)
-   [Docker](https://www.docker.com/docker-community)
-   [Redis](https://redis.io/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Yup](https://www.npmjs.com/package/yup)
-   [DotEnv](https://www.npmjs.com/package/dotenv)
- [Swagger](https://swagger.io/)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://jestjs.io/)

## Instalação API

Para clonar e rodar essa aplicação, você vai precisar do [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/docker-community) + [Docker-Compose](https://docs.docker.com/compose/install/) + [Npm](https://www.npmjs.com/) instalados no seu computador.

Na linha de comando do seu terminal:

```bash
# Clonar repositorio
$ git clone https://github.com/diegopgcabral/desafio-b2w-star-wars.git

# Ir para a raiz do projeto
$ cd desafio-b2w-star-wars

# Para executar o projeto
$ docker-compose up

# Para parar o projeto
$ ctrl + c
$ docker-compose down
$ docker-compose stop

# Para executar os testes do projeto
$ npm test
```
# DOCUMENTAÇÃO
* http://localhost:3000/api-docs

# URL BASE
* http://localhost:3000

## Endpoints da API

#### 	Rota de boas vindas
* GET /

#### Buscar todos os planetas
* GET /planets

#### Cadastrar um novo planeta
* POST /planets
```
{
    "name": "Dagobah",
    "climate": "murky",
    "terrain": "swamp, jungles"
}
```
#### Buscar planeta por ID
* GET /planets/id-planeta-desejado

#### Buscar planeta por nome
* GET /planets/search/nome-planeta-desejado

#### Remover planeta
* DELETE /planets/nome-planeta-desejado

-------
> Desenvolvido por Diego Cabral  - [Linkedin](https://www.linkedin.com/in/diego-pg-cabral/)
