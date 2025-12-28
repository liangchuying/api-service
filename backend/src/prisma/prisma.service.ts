import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL 未配置，无法初始化数据库连接');
    }

    try {
      // 清理连接字符串（去除可能的引号）
      const cleanConnectionString = connectionString
        .trim()
        .replace(/^["']|["']$/g, '');

      // 从 DATABASE_URL 解析连接参数
      const dbUrl = new URL(cleanConnectionString);

      const database = dbUrl.pathname.slice(1); // 移除前导斜杠

      if (!database) {
        throw new Error('DATABASE_URL 中未指定数据库名称');
      }

      console.log('Parsed database connection parameters:', {
        host: dbUrl.hostname,
        port: dbUrl.port,
        user: dbUrl.username,
        database: database,
        password: dbUrl.password,
      });
      // 使用解析出的参数创建 MariaDB adapter
      const adapter = new PrismaMariaDb({
        host: dbUrl.hostname,
        port: parseInt(dbUrl.port) || 3306,
        user: dbUrl.username,
        password: dbUrl.password,
        database: database,
        connectionLimit: 5,
      });

      // 调用父类构造函数，传入 adapter
      super({ adapter });
    } catch (error) {
      throw new Error(
        `无法解析 DATABASE_URL 或初始化数据库连接: ${error.message}. DATABASE_URL: ${connectionString?.substring(0, 30)}...`,
      );
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
