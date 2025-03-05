import { FastifyInstance } from 'fastify';
import { createAdmin, getAllAdmins, updateAdmin } from '../interface/controllers/adminController';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.post('/admins', createAdmin);
  fastify.get("/admins", getAllAdmins);
  fastify.put('/admins/:id', updateAdmin);
}
