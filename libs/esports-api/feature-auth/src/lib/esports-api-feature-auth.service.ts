import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '@project-assignment/shared/data-models-api';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

export interface TokenPayload {
  username: string;
  sub: number;
}

@Injectable()
export class EsportsApiFeatureAuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload: TokenPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
