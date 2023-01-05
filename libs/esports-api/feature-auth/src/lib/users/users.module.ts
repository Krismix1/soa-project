import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService, UserToDTOMapper } from './users.service';

@Module({
  providers: [UsersService, UserToDTOMapper],
  exports: [UsersService, UserToDTOMapper],
  controllers: [UserController],
})
export class UsersModule {}
