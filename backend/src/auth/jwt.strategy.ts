import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (res) => {
        let token = null;
        if (res && res.cookies) {
          token = res.cookies['token'];
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken()(res);
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'dev_jwt_secret'),
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
