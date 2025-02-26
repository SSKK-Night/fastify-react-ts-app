import { TaskGenre } from '../entities/TaskGenre';

export interface ITaskGenreRepository {
  createTaskGenre(name: string, description?: string): Promise<void>;
  getAllTaskGenres(): Promise<TaskGenre[]>;
//   getTaskGenreById(id: number): Promise<TaskGenre | null>;
//   updateTaskGenre(id: number, data: Partial<TaskGenre>): Promise<TaskGenre | null>;
//   deleteTaskGenre(id: number): Promise<void>;
}
