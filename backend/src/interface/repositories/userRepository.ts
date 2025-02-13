import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma, getAllNodeIds, getDatabaseByNodeId  } from '../../infrastructure/database/prismaClient';

export class UserRepository implements IUserRepository {

  async createUser(data: Omit<User, 'uuid' | 'created_at' | 'updated_at'>): Promise<User> {
    const db = getDatabaseByNodeId(data.nodeid); // 適切なノードのDBに接続

    return await db.user.create({
      data: {
        ...data, // 受け取ったデータをそのままセット
      },
    });
  }

  async getUserById(uuid: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { uuid } });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async updateUser(uuid: string, data: Partial<User>): Promise<User | null> {
    return await prisma.user.update({
      where: { uuid },
      data
    });
  }

  async deleteUser(uuid: string): Promise<void> {
    await prisma.user.update({
      where: { uuid },
      data: { delete_flag: true }
    });
  }

  async getUserCountsPerNode(): Promise<Record<number, number>> {
    const nodeIds = getAllNodeIds();
    const userCounts: Record<number, number> = {};

    for (const nodeId of nodeIds) {
      try {
        const db = getDatabaseByNodeId(nodeId);
        const count: number = await db.user.count(); // 型を明示
        userCounts[nodeId] = count;
      } catch (error) {
        console.error(`ユーザー数取得失敗（Node ${nodeId}）:`, error);
        userCounts[nodeId] = Infinity;
      }
    }

    return userCounts;
}
}
