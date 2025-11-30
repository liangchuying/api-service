import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsJSON } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '任务标题' })
  @IsString()
  title: string;

  @ApiProperty({ description: '任务描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '优先级 (low/medium/high)', required: false })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiProperty({ description: '截止日期', required: false, example: '2025-12-31T23:59:59Z' })
  @IsDateString()
  @IsOptional()
  deadline?: string;

  @ApiProperty({ description: '自定义扩展 JSON 数据', required: false })
  @IsOptional()
  extra?: Record<string, any>;
}
