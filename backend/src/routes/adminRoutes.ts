import { FastifyInstance } from "fastify";
import { adminController } from "../interface/controllers/adminController";

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.post("/admins", adminController.createAdmin);
  fastify.get("/admins", adminController.getAllAdmins);
  fastify.put("/admins/:id", adminController.updateAdmin);
  fastify.put("/admins/:id/password", adminController.changePassword);
  fastify.delete("/admins/:id", adminController.deleteAdmin);
}
