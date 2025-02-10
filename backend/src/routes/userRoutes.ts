import { FastifyInstance } from 'fastify';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../interface/controllers/userController';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', createUser);
  fastify.get('/users', getAllUsers);
  fastify.get('/users/:uuid', getUser);
  fastify.put('/users/:uuid', updateUser);
  fastify.delete('/users/:uuid', deleteUser);
}
