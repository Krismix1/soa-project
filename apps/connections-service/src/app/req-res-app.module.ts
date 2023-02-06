import { Module } from '@nestjs/common';
import { EsportsApiFeatureConnectionsModule } from '@project-assignment/esports-api/feature-connections';

@Module({
  imports: [EsportsApiFeatureConnectionsModule],
  controllers: [],
  providers: [],
})
export class ReqResAppModule {}
