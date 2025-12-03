import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (exists) {
      throw new ConflictException('邮箱已被注册');
    }

    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username ?? data.email,
        password: hash,
        nickname: data.nickname,
        avatar: data.avatar,
        phone: data.phone,
      },
    });
    return this.buildToken(user.id, user.email);
  }

  async login(data: LoginDto) {
    console.log('Login attempt for email:', data.email);
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('账号或密码错误');
    }

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) {
      throw new UnauthorizedException('账号或密码错误');
    }

    const roles = user.roles.map((r) => r.role.name);
    return this.buildToken(user.id, user.email, roles);
  }

  private async buildToken(
    userId: number,
    email: string,
    roles: string[] = [],
  ) {
    const payload = { sub: userId, email, roles };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
