import { FastifyInstance } from 'fastify';
import { createTaskGenre, getAllTaskGenres } from '../interface/controllers/taskGenreController';

export async function taskGenreRoutes(fastify: FastifyInstance) {
  fastify.post('/taskGenres', createTaskGenre);
  fastify.get('/task-genres', getAllTaskGenres);
}
