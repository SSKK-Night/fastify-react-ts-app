export class Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  last_login_at: Date | null;  // ✅ `null` を許容
  failed_attempts: number;
  locked_until: Date | null;   // ✅ `null` を許容
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    isActive: boolean,
    created_at: Date,
    updated_at: Date,
    last_login_at?: Date | null,   // ✅ `undefined` または `null` も許容
    locked_until?: Date | null,    // ✅ `undefined` または `null` も許容
    failed_attempts: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.last_login_at = last_login_at ?? null;  // ✅ `null` の場合そのまま
    this.locked_until = locked_until ?? null;    // ✅ `null` の場合そのまま
    this.failed_attempts = failed_attempts;
  }
}
