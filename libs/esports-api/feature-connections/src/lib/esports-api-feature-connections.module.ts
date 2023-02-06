import { Module } from '@nestjs/common';
import { EsportsApiSharedProxyClientsModule } from '@project-assignment/esports-api/shared-proxy-clients';
import { EsportsApiFeatureConnectionsController } from './esports-api-feature-connections.controller';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Module({
  imports: [EsportsApiSharedProxyClientsModule],
  controllers: [EsportsApiFeatureConnectionsController],
  providers: [EsportsApiFeatureConnectionsService],
  exports: [],
})
export class EsportsApiFeatureConnectionsModule {}
