import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository {
  private _taskRepository: Repository<Task>;

  constructor(private dataSource: DataSource) {
    this._taskRepository = this.dataSource.getRepository(Task);
  }

  createQueryBuilder(alias: string) {
    return this._taskRepository.createQueryBuilder(alias);
  }

  async findOne(options: any): Promise<Task> {
    return this._taskRepository.findOne(options);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this._taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this._taskRepository.save(task);
    return task;
  }

  get taskRepository(): Repository<Task> {
    return this._taskRepository;
  }

  async delete(id: string): Promise<void> {
    await this._taskRepository.delete(id);
  }

  async save(task: Task): Promise<Task> {
    return this._taskRepository.save(task);
  }
}
