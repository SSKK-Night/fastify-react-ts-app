import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma } from '../../infrastructure/database/prismaClient';

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: user
    });
    return newUser;
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
}
