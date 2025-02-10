import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/userService';
import { User } from '../../domain/entities/User';

const userService = new UserService();

type UserInput = Omit<User, 'uuid' | 'created_at' | 'updated_at'>;

export const createUser = async (req: FastifyRequest<{ Body: UserInput }>, reply: FastifyReply) => {
    try {
      const userData: UserInput = req.body;
      const user = await userService.createUser(userData);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };

export const getUser = async (req: FastifyRequest<{ Params: { uuid: string } }>, reply: FastifyReply) => {
  const user = await userService.getUserById(req.params.uuid);
  user ? reply.send(user) : reply.status(404).send({ error: 'User not found' });
};

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await userService.getAllUsersFromAllNodes();
  reply.send(users);
};

export const updateUser = async (req: FastifyRequest<{ Params: { uuid: string }; Body: UserInput }>, reply: FastifyReply) => {
    try {
      const updatedUser = await userService.updateUser(req.params.uuid, req.body);
      updatedUser ? reply.send(updatedUser) : reply.status(404).send({ error: 'User not found' });
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };

export const deleteUser = async (req: FastifyRequest<{ Params: { uuid: string } }>, reply: FastifyReply) => {
  await userService.deleteUser(req.params.uuid);
  reply.send({ message: 'User deleted' });
};
