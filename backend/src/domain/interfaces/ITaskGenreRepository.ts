import { TaskGenre } from '../entities/TaskGenre';

export interface ITaskGenreRepository {
  createTaskGenre(name: string, description?: string): Promise<void>;
  getAllTaskGenres(): Promise<TaskGenre[]>;
//   getTaskGenreById(id: number): Promise<TaskGenre | null>;
  updateTaskGenre(id: number, name?: string, description?: string): Promise<void>;
//   deleteTaskGenre(id: number): Promise<void>;
}
