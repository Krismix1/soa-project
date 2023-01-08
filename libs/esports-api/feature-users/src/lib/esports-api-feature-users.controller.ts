import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { User } from './entities/user.entity';
import { EsportsApiFeatureUsersService, UserToDTOMapper } from './esports-api-feature-users.service';

@Controller('users')
export class EsportsApiFeatureUsersController {
  constructor(private userMapper: UserToDTOMapper, private userService: EsportsApiFeatureUsersService) {}

  @Get('me')
  getCurrentUserProfile(@Req() req: Request): UserDetails {
    return this.userMapper.mapOne(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserDetails {
    const user = this.userService.findOneById(+id);
    return this.userMapper.mapOne(user);
  }
}
