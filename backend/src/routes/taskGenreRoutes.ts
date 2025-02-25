import { FastifyInstance } from 'fastify';
import { createTaskGenre } from '../interface/controllers/taskGenreController';

export async function taskGenreRoutes(fastify: FastifyInstance) {
  fastify.post('/taskGenres', createTaskGenre);
}
