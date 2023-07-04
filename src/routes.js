import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CursoController from './app/controllers/CursoController';
import MatriculaController from './app/controllers/MatriculaController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/cursos', CursoController.store);

// Todas rotas abaixo desse middleware precisa estar autenticado
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/matriculas', MatriculaController.store);
routes.get('/matriculas', MatriculaController.index);
routes.put('/matriculas/:matricula_id', MatriculaController.update);
routes.delete('/matriculas/:matricula_id', MatriculaController.delete);

export default routes;
