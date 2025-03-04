import { FastifyReply, FastifyRequest } from 'fastify';
import { AdminService } from '../services/adminService';

const adminService = new AdminService();

export const createAdmin = async (
  req: FastifyRequest<{ Body: { name: string; email: string; password: string; role: string } }>,
  reply: FastifyReply
) => {
  try {
    await adminService.createAdmin(req.body.name, req.body.email, req.body.password, req.body.role);
    reply.status(201).send({ message: 'Admin created successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const getAllAdmins = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const admins = await adminService.getAllAdmins();
    reply.send(admins);
  } catch (error) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
};
