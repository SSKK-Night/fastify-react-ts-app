import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma, getAllNodeIds, getDatabaseByNodeId  } from '../../infrastructure/database/prismaClient';
import { getLeastLoadedNode } from '../../util/leastLoadedNode';

export class UserRepository implements IUserRepository {

  async createUser(data: Omit<User, 'uuid' | 'created_at' | 'updated_at' | 'nodeid'>): Promise<User> {
    try {
        const leastLoadedNode = await getLeastLoadedNode(); // ユーザー数が最も少ないノードを取得
        if (!leastLoadedNode) {
            throw new Error("ノードの選択に失敗しました");
        }

        const nodeId = parseInt(leastLoadedNode.replace("node", ""), 10);
        if (isNaN(nodeId)) {
            throw new Error(`ノードIDの変換に失敗: ${leastLoadedNode}`);
        }

        const db = getDatabaseByNodeId(nodeId);
        if (!db) {
            throw new Error(`データベース接続が見つかりません (nodeId: ${nodeId})`);
        }

        console.log(`ユーザーをノード ${nodeId} に登録`);

        return await db.user.create({
            data: {
                ...data,
                nodeid: nodeId, // ノードIDを補完
            },
        });
    } catch (error) {
        console.error("createUser エラー:", error);
        throw new Error("ユーザー作成に失敗しました");
    }
}

  async getUserById(uuid: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { uuid } });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  private async findNodeIdByUuid(uuid: string): Promise<number | null> {
    for (const nodeid of getAllNodeIds()) {
      const prisma = getDatabaseByNodeId(nodeid);
      const user = await prisma.user.findUnique({
        where: { uuid },
        select: { nodeid: true }
      });

      if (user) return user.nodeid; // 見つかったら `nodeid` を返す
    }
    return null; // どのノードにも存在しない場合
  }

  async updateUser(uuid: string, nodeId: number, data: Partial<User>): Promise<User | null> {

    const prisma = getDatabaseByNodeId(nodeId);
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
