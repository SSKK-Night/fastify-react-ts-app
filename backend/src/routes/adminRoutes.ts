import { FastifyInstance } from 'fastify';
import { createAdmin, getAllAdmins } from '../interface/controllers/adminController';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.post('/admins', createAdmin);
  fastify.get("/admins", getAllAdmins);
}
