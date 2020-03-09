import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger';

import PlanetController from './app/controllers/PlanetController';
import FilterPlanetController from './app/controllers/FilterPlanetController';

import validatePlanetStore from './app/validators/PlanetStore';

const routes = new Router();

// serve swagger api
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * definitions:
 *   NewPlanet:
 *     properties:
 *       name:
 *         type: string
 *       climate:
 *         type: string
 *       terrain:
 *         type: string
 *   Planet:
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       climate:
 *         type: string
 *       terrain:
 *         type: string
 *       numberOfMovies:
 *         type: number
 */

/**
 * @swagger
 *
 * /planets:
 *   post:
 *     tags:
 *       - Planet
 *     description: Cria um planeta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Planet
 *         description: Planet object
 *         in:  body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/NewPlanet'
 *     responses:
 *       201:
 *         description: Planeta cadastrado com sucesso.
 *         schema:
 *           $ref: '#/definitions/Planet'
 *       400:
 *         description: Erro ao cadastrar o planeta.
 */

// Cadastrar um planeta no BD
routes.post('/planets', validatePlanetStore, PlanetController.store);

/**
 * @swagger
 *
 * /planets:
 *   get:
 *     tags:
 *       - Planet
 *     description: Retorna todos os planetas cadastrados
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna as informações dos planetas
 *         schema:
 *           $ref: '#/definitions/Planet'
 *       400:
 *         description: Erro ao realizar a consulta.
 */

// Exibe todos os planetas cadastrados no BD
routes.get('/planets', PlanetController.index);

/**
 * @swagger
 *
 * /planets/{id}:
 *   get:
 *     tags:
 *       - Planet
 *     description: Retorna um planeta pelo ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Planet ID
 *         in:  path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna as informações do planeta
 *         schema:
 *           $ref: '#/definitions/Planet'
 *       400:
 *         description: Erro ao realizar a consulta.
 *       404:
 *         description: ID inválido.
 */

// Exibe o planeta de acordo com o id
routes.get('/planets/:id', FilterPlanetController.show);

/**
 * @swagger
 *
 * /planets/{name}:
 *   get:
 *     tags:
 *       - Planet
 *     description: Retorna um planeta pelo nome
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Planet name
 *         in:  path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna as informações do planeta
 *         schema:
 *           $ref: '#/definitions/Planet'
 *       400:
 *         description: Erro ao realizar a consulta.
 *       404:
 *         description: Planeta não cadastrado.
 */

// Exibe o planeta de acordo com o nome
routes.get('/planets/search/:name', FilterPlanetController.index);

/**
 * @swagger
 *
 * /planets/{id}:
 *   delete:
 *     tags:
 *       - Planet
 *     description: Remove um planeta pelo ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Planet ID
 *         in:  path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Planeta removido com sucesso.
 *       404:
 *         description: ID inválido.
 */

// Remover um planeta do BD
routes.delete('/planets/:id', PlanetController.delete);

export default routes;
