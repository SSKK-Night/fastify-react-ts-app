import { TaskGenreRepository } from '../repositories/taskGenreRepository';

const taskGenreRepository = new TaskGenreRepository();

export class TaskGenreService {
  async createTaskGenre(name: string, description?: string): Promise<void> {
    await taskGenreRepository.createTaskGenre(name, description);
  }
}
