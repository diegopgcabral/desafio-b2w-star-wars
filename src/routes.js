import { Router } from 'express';

import PlanetController from './app/controllers/PlanetController';
import FilterPlanetController from './app/controllers/FilterPlanetController';

import validatePlanetStore from './app/validators/PlanetStore';

const routes = new Router();

// Cadastrar um planeta no BD
routes.post('/planets', validatePlanetStore, PlanetController.store);
// Exibe todos os planetas cadastrados no BD
routes.get('/planets', PlanetController.index);
// Remover um planeta do BD
routes.delete('/planets/:id', PlanetController.delete);

// Exibe o planeta de acordo com o id
routes.get('/planets/:id', FilterPlanetController.show);
// Exibe o planeta de acordo com o id
routes.get('/planets/search/:name', FilterPlanetController.index);

export default routes;
