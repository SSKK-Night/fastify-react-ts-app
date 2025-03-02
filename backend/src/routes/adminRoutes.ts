import { FastifyInstance } from 'fastify';
import { createAdmin } from '../interface/controllers/adminController';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.post('/admins', createAdmin);
}
