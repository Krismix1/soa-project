import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@project-assignment/esports-api/feature-users';
import { Strategy } from 'passport-local';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: EsportsApiFeatureAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
