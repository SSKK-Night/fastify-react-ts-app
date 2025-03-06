import { IAdminRepository } from '../../domain/interfaces/IAdminRepository';
import { getAllNodeIds, getDatabaseByNodeId } from '../../infrastructure/database/prismaClient';
import { Admin } from '../../domain/entities/Admin';
import bcrypt from 'bcrypt';

export class AdminRepository implements IAdminRepository {
  async createAdmin(data: Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'last_login_at' | 'failed_attempts' | 'locked_until'>): Promise<void> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const nodeIds = getAllNodeIds();

    await Promise.all(
      nodeIds.map(async (nodeId) => {
        const prisma = getDatabaseByNodeId(nodeId);
        try {
          await prisma.admin.create({
            data: {
              ...data,
              password: hashedPassword,
              failed_attempts: 0,
              isActive: true,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
          console.log(`Admin "${data.name}" をノード ${nodeId} に登録しました`);
        } catch (error: any) {
          if (error.code === 'P2002') {
            console.warn(`⚠️ Admin "${data.email}" はノード ${nodeId} に既に存在しています`);
          } else {
            console.error(`ノード ${nodeId} で Admin 登録エラー:`, error);
          }
        }
      })
    );
  }

  async getAllAdmins(): Promise<Admin[]> {
    const prisma = getDatabaseByNodeId(1);
    return await prisma.admin.findMany();
  }

  async updateAdmin(id: number, data: Partial<Admin>): Promise<Admin | null> {
    // パスワードを編集対象から除外
    if ('password' in data) {
      delete data.password;
    }

    const nodeIds = getAllNodeIds(); // 全ノードを取得

    let updatedAdmin: Admin | null = null;

    // すべてのノードで `admin` を更新
    for (const nodeId of nodeIds) {
      const prisma = getDatabaseByNodeId(nodeId);
      try {
        const admin = await prisma.admin.update({
          where: { id },
          data,
        });

        // 1つのノードの更新結果を格納
        if (!updatedAdmin) {
          updatedAdmin = admin;
        }
      } catch (error) {
        console.error(`ノード ${nodeId} の管理者更新に失敗:`, error);
      }
    }

    return updatedAdmin;
  }

  async updatePassword(id: number, hashedPassword: string): Promise<boolean> {
    const nodeIds = getAllNodeIds(); // すべてのノードIDを取得

    try {
      await Promise.all(
        nodeIds.map(async (nodeId) => {
          const prisma = getDatabaseByNodeId(nodeId);
          await prisma.admin.update({
            where: { id },
            data: { password: hashedPassword, updated_at: new Date() }
          });
        })
      );
      return true;
    } catch (error) {
      console.error("Admin パスワード更新エラー:", error);
      return false;
    }
  }

//   async getAdminById(id: number): Promise<Admin | null> {
//     const prisma = getDatabaseByNodeId(1);
//     return await prisma.admin.findUnique({ where: { id } });
//   }

//   async getAdminByEmail(email: string): Promise<Admin | null> {
//     const prisma = getDatabaseByNodeId(1);
//     return await prisma.admin.findUnique({ where: { email } });
//   }

//   async updateAdmin(id: number, data: Partial<Admin>): Promise<Admin | null> {
//     const nodeIds = getAllNodeIds();
//     let updatedAdmin: Admin | null = null;

//     await Promise.all(
//       nodeIds.map(async (nodeId) => {
//         const prisma = getDatabaseByNodeId(nodeId);
//         try {
//           const admin = await prisma.admin.update({
//             where: { id },
//             data,
//           });
//           if (!updatedAdmin) updatedAdmin = admin; // 最初の成功したデータを返す
//         } catch (error: any) {
//           console.error(`ノード ${nodeId} で Admin 更新エラー:`, error);
//         }
//       })
//     );
//     return updatedAdmin;
//   }
}
