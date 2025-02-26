import { TaskGenreRepository } from '../repositories/taskGenreRepository';
import { TaskGenre } from '../../domain/entities/TaskGenre';

const taskGenreRepository = new TaskGenreRepository();

export class TaskGenreService {
  async createTaskGenre(name: string, description?: string): Promise<void> {
    await taskGenreRepository.createTaskGenre(name, description);
  }

  async getAllTaskGenres(): Promise<TaskGenre[]> {
    return await taskGenreRepository.getAllTaskGenres();
  }
}
