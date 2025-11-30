import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: '任务标题', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '任务描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '任务状态 (todo/doing/done)', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: '优先级 (low/medium/high)', required: false })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiProperty({ description: '截止日期', required: false })
  @IsDateString()
  @IsOptional()
  deadline?: string;

  @ApiProperty({ description: '自定义扩展 JSON 数据', required: false })
  @IsOptional()
  extra?: Record<string, any>;

  @ApiProperty({ description: '完成时间', required: false })
  @IsDateString()
  @IsOptional()
  completedAt?: string;
}
