import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: '创建任务' })
  async create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user.userId, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: '获取用户任务列表' })
  async findAll(@Request() req, @Query('status') status?: string) {
    return this.tasksService.findAll(req.user.userId, status);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取任务统计信息' })
  async getStats(@Request() req) {
    return this.tasksService.getStats(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取任务详情' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新任务' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, req.user.userId, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除任务' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.tasksService.remove(+id, req.user.userId);
  }

  @Post('bulk-update-status')
  @ApiOperation({ summary: '批量更新任务状态' })
  async updateStatus(
    @Request() req,
    @Body() body: { ids: number[]; status: string },
  ) {
    return this.tasksService.updateStatus(
      body.ids,
      req.user.userId,
      body.status,
    );
  }
}
