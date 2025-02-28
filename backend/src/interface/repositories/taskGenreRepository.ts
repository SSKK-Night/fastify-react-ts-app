import { ITaskGenreRepository } from '../../domain/interfaces/ITaskGenreRepository';
import { getAllNodeIds, getDatabaseByNodeId } from '../../infrastructure/database/prismaClient';
import { TaskGenre } from '../../domain/entities/TaskGenre';

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

  async getAllTaskGenres(): Promise<TaskGenre[]> {
    const prisma = getDatabaseByNodeId(1);
    const rawGenres = await prisma.taskGenre.findMany();

    return rawGenres.map((genre) => ({
      ...genre,
      description: genre.description ?? "", 
    }));
  }

  async updateTaskGenre(id: number, name?: string, description?: string): Promise<void> {
    const nodeIds = getAllNodeIds(); // 全ノードの ID を取得

    await Promise.all(
      nodeIds.map(async (nodeId) => {
        const prisma = getDatabaseByNodeId(nodeId);
        try {
          await prisma.taskGenre.update({
            where: { id },
            data: {
              name,
              description,
              updated_at: new Date(),
            },
          });
          console.log(`TaskGenre ID: ${id} をノード ${nodeId} で更新しました`);
        } catch (error: any) {
          console.error(`ノード ${nodeId} で TaskGenre 更新エラー:`, error);
        }
      })
    );
  }
}
