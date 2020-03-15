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
 *   Novo_Planeta:
 *     properties:
 *       name:
 *         type: string
 *       climate:
 *         type: string
 *       terrain:
 *         type: string
 *   Planeta:
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
 *       - Planeta
 *     summary: Cria um novo planeta
 *     description: Cria um novo planeta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Planeta
 *         description: JSON do planeta
 *         in:  body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Novo_Planeta'
 *     responses:
 *       201:
 *         description: Planeta cadastrado com sucesso.
 *         schema:
 *           $ref: '#/definitions/Planeta'
 *       400:
 *         description: Planeta já cadastrado.
 *       500:
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
 *       - Planeta
 *     summary: Lista todos os planetas cadastrados no BD
 *     description: Retorna todos os planetas cadastrados
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna as informações dos planetas
 *         schema:
 *           $ref: '#/definitions/Planeta'
 *       500:
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
 *       - Planeta
 *     summary: Retorna um planeta pelo ID
 *     description: Retorna um planeta pelo ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID do planeta
 *         in:  path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna as informações do planeta
 *         schema:
 *           $ref: '#/definitions/Planeta'
 *       500:
 *         description: Erro ao realizar a consulta.
 *       404:
 *         description: ID inválido.
 */

// Exibe o planeta de acordo com o id
routes.get('/planets/:id', FilterPlanetController.show);

/**
 * @swagger
 *
 * /planets/search/{nome}:
 *   get:
 *     tags:
 *       - Planeta
 *     summary: Retorna um planeta pelo nome
 *     description: Retorna um planeta pelo nome
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nome
 *         description: Nome do planeta
 *         in:  path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna as informações do planeta
 *         schema:
 *           $ref: '#/definitions/Planeta'
 *       500:
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
 *       - Planeta
 *     summary: Remove um planeta pelo ID
 *     description: Remove um planeta pelo ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nome
 *         description: nome do planeta
 *         in:  path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Planeta removido com sucesso.
 *       404:
 *         description: Nome inválido.
 */

// Remover um planeta do BD
routes.delete('/planets/:name', PlanetController.destroy);

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Bem vindo ao Desafio B2W' });
});

export default routes;
