import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants, User } from '@project-assignment/shared/data-models-api';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface TokenPayload {
  username: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: TokenPayload): Omit<User, 'password'> {
    return { id: payload.sub, username: payload.username };
  }
}
