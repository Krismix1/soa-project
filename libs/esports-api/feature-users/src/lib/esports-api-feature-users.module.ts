import { Module } from '@nestjs/common';
import { EsportsApiFeatureUsersController } from './esports-api-feature-users.controller';
import { EsportsApiFeatureUsersService, UserToDTOMapper } from './esports-api-feature-users.service';

@Module({
  controllers: [EsportsApiFeatureUsersController],
  providers: [EsportsApiFeatureUsersService, UserToDTOMapper],
  exports: [EsportsApiFeatureUsersService, UserToDTOMapper],
})
export class EsportsApiFeatureUsersModule {}
