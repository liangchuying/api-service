import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId: userId,
      },
    });
  }

  async findAll(pagination: PaginationDto) {
    const page = pagination.page ?? 1;
    const pageSize = pagination.pageSize ?? 10;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.post.count(),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.post.delete({ where: { id } });
    return { success: true };
  }
}


