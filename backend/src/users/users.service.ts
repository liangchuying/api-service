import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: PaginationDto) {
    const page = pagination.page ?? 1;
    const pageSize = pagination.pageSize ?? 10;
    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          isActive: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    let password: string | undefined;
    if (dto.password) {
      password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        username: dto.name,
        isActive: dto.isActive,
        ...(password && { password }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return { success: true };
  }
}
