import { User } from '../entities/User';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(uuid: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(uuid: string, nodeId: number, data: Partial<User>): Promise<User | null>;
  deleteUser(uuid: string, nodeId: number): Promise<void>;
  getUserCountsPerNode(): Promise<Record<number, number>>;
}
