import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthServiceProxy } from '@project-assignment/esports-api/shared-proxy-clients';
import { User } from '@project-assignment/shared/data-models-api';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthServiceProxy) {
    super();
  }

  async validate(username: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await firstValueFrom(this.authService.validateUser(username, password));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
