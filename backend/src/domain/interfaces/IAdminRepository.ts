import { Admin } from '../entities/Admin';

export interface IAdminRepository {
  createAdmin(data: Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'last_login_at' | 'failed_attempts' | 'locked_until'>): Promise<void>;
  getAllAdmins(): Promise<Admin[]>;
//   getAdminById(id: number): Promise<Admin | null>;
//   getAdminByEmail(email: string): Promise<Admin | null>;
  updateAdmin(id: number, data: Partial<Admin>): Promise<Admin | null>;
}
