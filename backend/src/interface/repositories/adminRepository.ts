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
