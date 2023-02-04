import { Module } from '@nestjs/common';
import { EsportsApiFeatureUsersService, UserToDTOMapper } from '@project-assignment/esports-api/feature-users';
import { EsportsApiFeatureConnectionsController } from './esports-api-feature-connections.controller';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Module({
  controllers: [EsportsApiFeatureConnectionsController],
  providers: [EsportsApiFeatureConnectionsService, UserToDTOMapper, EsportsApiFeatureUsersService],
  exports: [EsportsApiFeatureConnectionsService],
})
export class EsportsApiFeatureConnectionsModule {}
