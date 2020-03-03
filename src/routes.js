import { Router } from 'express';
import PlanetController from './app/controllers/PlanetController';

const routes = new Router();

// Cadastrar um planeta
routes.post('/planets', PlanetController.store);

export default routes;
