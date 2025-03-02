export class Admin {
    id: number; // UUID ではなく `Int`
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    last_login_at?: Date;
    failed_attempts: number;
    locked_until?: Date;
    created_at: Date;
    updated_at: Date;
  
    constructor(
      id: number,
      name: string,
      email: string,
      password: string,
      role: string,
      isActive: boolean,
      failed_attempts: number,
      created_at: Date,
      updated_at: Date,
      last_login_at?: Date,
      locked_until?: Date
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
      this.isActive = isActive;
      this.failed_attempts = failed_attempts;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.last_login_at = last_login_at;
      this.locked_until = locked_until;
    }
  }
  