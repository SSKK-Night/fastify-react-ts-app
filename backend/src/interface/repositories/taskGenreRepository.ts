import { ITaskGenreRepository } from '../../domain/interfaces/ITaskGenreRepository';
import { getAllNodeIds, getDatabaseByNodeId } from '../../infrastructure/database/prismaClient';

export class TaskGenreRepository implements ITaskGenreRepository {
  async createTaskGenre(name: string, description?: string): Promise<void> {
    const nodeIds = getAllNodeIds();
    const transactions = [];

    try {
      for (const nodeId of nodeIds) {
        const prisma = getDatabaseByNodeId(nodeId);
        transactions.push(
          prisma.taskGenre.create({
            data: { name, description, isActive: true },
          })
        );
      }

      await Promise.all(transactions);
      console.log(`TaskGenre "${name}" を全ノードに登録しました`);
    } catch (error: any) {
      console.error(`TaskGenre "${name}" の登録中にエラー発生:`, error);
      throw new Error("TaskGenre の作成に失敗しました");
    }
  }
}
