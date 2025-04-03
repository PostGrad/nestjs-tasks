import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
  async getTaskById(id: string): Promise<Task> {
    const task = this.tasksRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<string> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    await this.tasksRepository.delete(id);
    return `Task ${id} deleted successfully.`;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
