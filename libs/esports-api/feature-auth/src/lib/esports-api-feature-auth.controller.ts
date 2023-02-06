import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EsportsApiFeatureUsersService } from '@project-assignment/esports-api/feature-users';
import { ConnectionsServiceProxy } from '@project-assignment/esports-api/shared-proxy-clients';
import { CreateUserDto, LoginResponse, User } from '@project-assignment/shared/data-models-api';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';

@Controller()
export class EsportsApiFeatureAuthController {
  constructor(
    private authService: EsportsApiFeatureAuthService,
    private userService: EsportsApiFeatureUsersService,
    private connectionsService: ConnectionsServiceProxy,
  ) {}

  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(data: { username: string; password: string }): Promise<Omit<User, 'password'>> {
    return await this.authService.validateUser(data.username, data.password);
  }

  @MessagePattern({ cmd: 'login' })
  login(@Payload() data: { user: User }): Promise<LoginResponse> {
    return this.authService.login(data.user);
  }

  @MessagePattern({ cmd: 'register' })
  async create(data: { createUser: CreateUserDto }) {
    const user = await this.userService.create(data.createUser, 10);
    this.connectionsService.userCreated(user.id.toString());
    console.log('Emitted that user created');
  }
}
