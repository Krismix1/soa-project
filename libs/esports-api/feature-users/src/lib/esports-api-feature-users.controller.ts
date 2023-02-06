import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './entities/user.entity';
import { EsportsApiFeatureUsersService, UserToDTOMapper } from './esports-api-feature-users.service';

@Controller()
export class EsportsApiFeatureUsersController {
  constructor(private userMapper: UserToDTOMapper, private userService: EsportsApiFeatureUsersService) {}

  // @MessagePattern({ cmd: 'create_user' })
  // async create(data: { createsUserDto: CreateUserDto; saltRounds: number }) {
  //   return this.userMapper.mapOne(await this.userService.create(data.createsUserDto, data.saltRounds));
  // }

  @MessagePattern({ cmd: 'find_user_by_username' })
  findOneByUsername(data: { username: string }) {
    return this.userMapper.mapOne(this.userService.findOneByUsername(data.username));
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  findOneById(data: { id: number }) {
    return this.userMapper.mapOne(this.userService.findOneById(data.id));
  }

  @MessagePattern({ cmd: 'map_one_user' })
  mapOne(data: { user: User }) {
    return this.userMapper.mapOne(data.user);
  }
}
