import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

/**
 * TasksScheduler
 * - 每分钟检查一次快到期的任务（示例），并记录日志或执行你需要的操作。
 * - 你可以按需修改 Cron 表达式为每天、每小时或其它频率。
 */
@Injectable()
export class TasksScheduler {
  private readonly logger = new Logger(TasksScheduler.name);

  constructor(private readonly prisma: PrismaService) {}

  // 启动后 5 秒执行一次（示例），用于初始化检查
  @Timeout(5000)
  async onStart() {
    this.logger.log('TasksScheduler started — performing initial check');
    // 示例：可以在这里执行一次检查
    await this.checkExpiringTasks();
  }

  // 每分钟检查一次（示例，改成生产需要的频率）
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Cron job running: check expiring tasks');
    await this.checkExpiringTasks();
  }

  private async checkExpiringTasks() {
    try {
      const now = new Date();
      const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h 内到期

      // 查找状态不是 done 且 deadline 在 now..soon 的任务
      const tasks = await this.prisma.task.findMany({
        where: {
          status: { not: 'done' },
          deadline: {
            gte: now,
            lte: soon,
          },
        },
      });

      if (tasks.length === 0) {
        this.logger.debug('No expiring tasks found');
        return;
      }

      // 这里示例性地记录日志。你可以替换成发送通知、邮件或更新任务状态等操作。
      for (const task of tasks) {
        this.logger.log(`Task expiring soon: id=${task.id}, title=${task.title}, deadline=${task.deadline}`);
      }
    } catch (error) {
      this.logger.error('Failed to check expiring tasks: ' + error.message);
    }
  }
}
