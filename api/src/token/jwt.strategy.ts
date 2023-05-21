import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'raioramalho2023',
      signOptions: { expiresIn: '15m' },
    });
  }

  private static extractJWT(req: Request): Promise<string | null> {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: {
    id: number;
    uuid: string;
    email: string;
    role: [];
  }) {
    return payload;
  }
}
