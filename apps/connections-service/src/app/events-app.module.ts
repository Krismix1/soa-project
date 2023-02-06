import { Module } from '@nestjs/common';
import { EsportsApiFeatureConnectionsEventsModule } from '@project-assignment/esports-api/feature-connections';

@Module({
  imports: [EsportsApiFeatureConnectionsEventsModule],
  controllers: [],
  providers: [],
})
export class EventsAppModule {}
