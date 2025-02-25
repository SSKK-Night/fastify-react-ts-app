export class TaskGenre {
    id!: number;
    name!: string;
    description?: string;
    isActive: boolean = true;
    created_at!: Date;
    updated_at!: Date;
  }
  