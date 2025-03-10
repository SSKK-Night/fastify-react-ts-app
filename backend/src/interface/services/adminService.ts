import { AdminRepository } from '../repositories/adminRepository';
import { Admin } from '../../domain/entities/Admin';
import bcrypt from 'bcrypt';

export class AdminService {
  private adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async createAdmin(name: string, email: string, password: string, role: string): Promise<void> {
    await this.adminRepository.createAdmin({ name, email, password, role, isActive: true, });
  }

  async getAllAdmins(): Promise<Admin[]> {
    return await this.adminRepository.getAllAdmins();
  }

  async updateAdmin(id: number, data: Partial<Admin>): Promise<Admin | null> {
    return await this.adminRepository.updateAdmin(id, data);
  }

  async changePassword(id: number, newPassword: string): Promise<boolean> {
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    return await this.adminRepository.updatePassword(id, hashedPassword);
  }

  async deleteAdmin(id: number): Promise<boolean> {
    const adminRepository = new AdminRepository();
    
    // すべてのノードの `Admin` を非アクティブ化
    return await adminRepository.deleteAdmin(id);
  }


}
