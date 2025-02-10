import { User } from '../../domain/entities/User';
import { UserRepository } from '../repositories/userRepository';

const userRepository = new UserRepository();

export class UserService {
  async createUser(data: Omit<User, 'uuid' | 'created_at' | 'updated_at'>): Promise<User> {
    const user = new User(
      crypto.randomUUID(),
      data.nodeid,
      data.name,
      data.email,
      data.disabilityName,
      data.gender,
      data.delete_flag,
      data.isActive,
      new Date(),
      new Date()
    );
    return await userRepository.createUser(user);
  }

  async getUserById(uuid: string): Promise<User | null> {
    return await userRepository.getUserById(uuid);
  }

  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  }

  async updateUser(uuid: string, data: Partial<User>): Promise<User | null> {
    return await userRepository.updateUser(uuid, data);
  }

  async deleteUser(uuid: string): Promise<void> {
    return await userRepository.deleteUser(uuid);
  }
}
