import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksScheduler } from './tasks.scheduler';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, TasksScheduler],
})
export class TasksModule {}
