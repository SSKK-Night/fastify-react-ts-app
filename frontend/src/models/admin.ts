export type Admin = {
    id: number;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    last_login_at: string | null;
    failed_attempts: number;
    locked_until: string | null;
    created_at: string;
    updated_at: string;
  };
  