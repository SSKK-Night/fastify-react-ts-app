import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../repositories/userRepository';
import { getAllNodeIds, getDatabaseByNodeId } from '../../infrastructure/database/prismaClient';
import { getLeastLoadedNode } from '../../util/leastLoadedNode';

const userRepository = new UserRepository();

export class UserService {
  async createUser(data: Omit<User, 'uuid' | 'created_at' | 'updated_at' | 'nodeid'>): Promise<User> {
    const leastLoadedNode = await getLeastLoadedNode();
    const nodeId = parseInt(leastLoadedNode.replace("node", ""));
    
    const user: User = {
      ...data,
      nodeid: nodeId,
      uuid: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
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

  async updateUser(nodeId: number, uuid: string, data: Partial<User>): Promise<User | null> {

    // 2️⃣ `uuid` のユーザー情報を更新
    return await userRepository.updateUser(uuid, nodeId, data);
  }

  async deleteUser(uuid: string): Promise<void> {
    return userRepository.deleteUser(uuid);
  }
}
