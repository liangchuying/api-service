import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建任务
   */
  async create(userId: number, createTaskDto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          title: createTaskDto.title,
          description: createTaskDto.description,
          priority: createTaskDto.priority || 'medium',
          deadline: createTaskDto.deadline
            ? new Date(createTaskDto.deadline)
            : null,
          extra: createTaskDto.extra || {},
          userId,
        },
      });
      return {
        statusCode: 201,
        message: '任务创建成功',
        data: task,
      };
    } catch (error) {
      throw new BadRequestException('创建任务失败: ' + error.message);
    }
  }

  /**
   * 获取用户所有任务
   */
  async findAll(userId: number, status?: string) {
    try {
      const where: any = { userId };
      if (status) {
        where.status = status;
      }

      const tasks = await this.prisma.task.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        statusCode: 200,
        message: '获取任务列表成功',
        data: tasks,
        total: tasks.length,
      };
    } catch (error) {
      throw new BadRequestException('获取任务列表失败: ' + error.message);
    }
  }

  /**
   * 获取单个任务
   */
  async findOne(id: number, userId: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!task) {
        throw new NotFoundException('任务不存在');
      }

      return {
        statusCode: 200,
        message: '获取任务详情成功',
        data: task,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('获取任务详情失败: ' + error.message);
    }
  }

  /**
   * 更新任务
   */
  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    try {
      // 检查任务是否存在且属于该用户
      const task = await this.prisma.task.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!task) {
        throw new NotFoundException('任务不存在');
      }

      // 处理完成时间逻辑
      let completedAt = updateTaskDto.completedAt
        ? new Date(updateTaskDto.completedAt)
        : undefined;
      if (updateTaskDto.status === 'done' && !completedAt) {
        completedAt = new Date();
      }

      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: {
          ...(updateTaskDto.title && { title: updateTaskDto.title }),
          ...(updateTaskDto.description !== undefined && {
            description: updateTaskDto.description,
          }),
          ...(updateTaskDto.status && { status: updateTaskDto.status }),
          ...(updateTaskDto.priority && { priority: updateTaskDto.priority }),
          ...(updateTaskDto.deadline && {
            deadline: new Date(updateTaskDto.deadline),
          }),
          ...(updateTaskDto.extra && { extra: updateTaskDto.extra }),
          ...(completedAt && { completedAt }),
        },
      });

      return {
        statusCode: 200,
        message: '任务更新成功',
        data: updatedTask,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('任务更新失败: ' + error.message);
    }
  }

  /**
   * 删除任务
   */
  async remove(id: number, userId: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!task) {
        throw new NotFoundException('任务不存在');
      }

      await this.prisma.task.delete({
        where: { id },
      });

      return {
        statusCode: 200,
        message: '任务删除成功',
        data: { id },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('任务删除失败: ' + error.message);
    }
  }

  /**
   * 批量更新任务状态
   */
  async updateStatus(ids: number[], userId: number, status: string) {
    try {
      const result = await this.prisma.task.updateMany({
        where: {
          id: {
            in: ids,
          },
          userId,
        },
        data: {
          status,
          ...(status === 'done' && { completedAt: new Date() }),
        },
      });

      return {
        statusCode: 200,
        message: '批量更新成功',
        data: {
          updated: result.count,
        },
      };
    } catch (error) {
      throw new BadRequestException('批量更新失败: ' + error.message);
    }
  }

  /**
   * 获取任务统计信息
   */
  async getStats(userId: number) {
    try {
      const total = await this.prisma.task.count({
        where: { userId },
      });

      const todo = await this.prisma.task.count({
        where: { userId, status: 'todo' },
      });

      const doing = await this.prisma.task.count({
        where: { userId, status: 'doing' },
      });

      const done = await this.prisma.task.count({
        where: { userId, status: 'done' },
      });

      return {
        statusCode: 200,
        message: '获取统计信息成功',
        data: {
          total,
          todo,
          doing,
          done,
        },
      };
    } catch (error) {
      throw new BadRequestException('获取统计信息失败: ' + error.message);
    }
  }
}
