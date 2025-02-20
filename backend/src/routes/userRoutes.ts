import { FastifyInstance } from 'fastify';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../interface/controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', createUser);
  fastify.get('/users', getAllUsers);
  fastify.get('/users/:uuid', getUser);
  fastify.patch('/users/:nodeid/:uuid', updateUser);
  fastify.delete('/users/:uuid', deleteUser);
}
