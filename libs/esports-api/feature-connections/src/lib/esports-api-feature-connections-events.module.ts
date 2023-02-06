import { Module } from '@nestjs/common';
import { EsportsApiFeatureConnectionsEventsController } from './esports-api-feature-connections-events.controller';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Module({
  imports: [],
  controllers: [EsportsApiFeatureConnectionsEventsController],
  providers: [EsportsApiFeatureConnectionsService],
  exports: [],
})
export class EsportsApiFeatureConnectionsEventsModule {}
