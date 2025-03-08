import { FastifyReply, FastifyRequest } from 'fastify';
import { AdminService } from '../services/adminService';
import { Admin } from '../../domain/entities/Admin';

const adminService = new AdminService();

export const adminController = {
  /**
   * Adminの作成
   */
  async createAdmin(
    req: FastifyRequest<{ Body: { name: string; email: string; password: string; role: string } }>,
    reply: FastifyReply
  ) {
    try {
      await adminService.createAdmin(req.body.name, req.body.email, req.body.password, req.body.role);
      reply.status(201).send({ message: 'Admin created successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  },

  /**
   * Admin一覧取得
   */
  async getAllAdmins(req: FastifyRequest, reply: FastifyReply) {
    try {
      const admins = await adminService.getAllAdmins();
      reply.send(admins);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },

  /**
   * Admin情報の更新
   */
  async updateAdmin(
    req: FastifyRequest<{ Params: { id: string }; Body: Partial<Admin> }>,
    reply: FastifyReply
  ) {
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
  },

  /**
   * Adminのパスワード変更
   */
  async changePassword(
    req: FastifyRequest<{ Params: { id: string }; Body: { newPassword: string; confirmPassword: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { newPassword, confirmPassword } = req.body;
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return reply.status(400).send({ error: "Invalid Admin ID" });
      }

      // パスワードの一致チェック
      if (newPassword !== confirmPassword) {
        return reply.status(400).send({ error: "Passwords do not match" });
      }

      // Adminのパスワード変更（全ノード）
      const success = await adminService.changePassword(id, newPassword);
      if (!success) {
        return reply.status(500).send({ error: "Failed to update password" });
      }

      return reply.send({ message: "Password changed successfully on all nodes" });
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },

  /**
   * Adminの削除（全ノード）
   */
  async deleteAdmin(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return reply.status(400).send({ error: "Invalid Admin ID" });
      }

      // Adminを削除（全ノード）
      const success = await adminService.deleteAdmin(id);
      if (!success) {
        return reply.status(500).send({ error: "Failed to delete Admin" });
      }

      return reply.send({ message: "Admin deleted successfully from all nodes" });
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
};
