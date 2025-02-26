import { FastifyRequest, FastifyReply } from 'fastify';
import { TaskGenreService } from '../services/taskGenreService';

const taskGenreService = new TaskGenreService();

export const createTaskGenre = async (
  req: FastifyRequest<{ Body: { name: string; description?: string } }>,
  reply: FastifyReply
) => {
  try {
    const { name, description } = req.body;
    await taskGenreService.createTaskGenre(name, description);
    reply.status(201).send({ message: 'TaskGenre created successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const getAllTaskGenres = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const taskGenres = await taskGenreService.getAllTaskGenres();
    reply.send(taskGenres);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};
