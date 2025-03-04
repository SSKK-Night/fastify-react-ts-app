import { FastifyReply, FastifyRequest } from 'fastify';
import { AdminService } from '../services/adminService';
import { Admin } from '../../domain/entities/Admin';

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

export const updateAdmin = async (
  req: FastifyRequest<{ Params: { id: string }; Body: Partial<Admin> }>,
  reply: FastifyReply
) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return reply.status(400).send({ error: 'Invalid admin ID' });
    }

    const updatedAdmin = await adminService.updateAdmin(id, req.body);
    updatedAdmin ? reply.send(updatedAdmin) : reply.status(404).send({ error: 'Admin not found' });
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const changePassword = async (
  req: FastifyRequest<{ Params: { id: string }; Body: { newPassword: string; confirmPassword: string } }>,
  reply: FastifyReply
) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return reply.status(400).send({ error: "Invalid Admin ID" });
    }

    // ❶ パスワードが一致するかチェック
    if (newPassword !== confirmPassword) {
      return reply.status(400).send({ error: "Passwords do not match" });
    }

    // ❷ Adminのパスワードを変更（全ノード）
    const success = await adminService.changePassword(id, newPassword);
    if (!success) {
      return reply.status(500).send({ error: "Failed to update password" });
    }

    return reply.send({ message: "Password changed successfully on all nodes" });
  } catch (error) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
};
