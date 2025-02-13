import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../repositories/userRepository';
import { getAllNodeIds, getDatabaseByNodeId } from '../../infrastructure/database/prismaClient';

const userRepository = new UserRepository();

export class UserService {
  async createUser(data: Omit<User, 'uuid' | 'created_at' | 'updated_at'>): Promise<User> {
    const user: User = {
      ...data,
      uuid: randomUUID(),
      created_at: new Date(),
      updated_at: new Date()
    };
    return await userRepository.createUser(user);
  }

  async getUserById(uuid: string): Promise<User | null> {
    return await userRepository.getUserById(uuid);
  }

  async getAllUsersFromAllNodes(): Promise<User[]> {
    const nodeIds = getAllNodeIds();
    const usersFromNodes = await Promise.all(
      nodeIds.map(nodeId => getDatabaseByNodeId(nodeId).user.findMany())
    );
    return usersFromNodes.flat();
  }

  async updateUser(uuid: string, data: Partial<User>): Promise<User | null> {
    return await userRepository.updateUser(uuid, data);
  }

  async deleteUser(uuid: string): Promise<void> {
    return userRepository.deleteUser(uuid);
  }
}
