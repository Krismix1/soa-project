import { DynamicModule, Module } from '@nestjs/common';
import { EsportsApiSharedProxyClientsModule } from '@project-assignment/esports-api/shared-proxy-clients';
import { EsportsApiFeatureConnectionsController } from './esports-api-feature-connections.controller';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Module({})
export class EsportsApiFeatureConnectionsModule {
  static forRoot(options: {
    authServiceUrl: string;
    authServicePort: number;
    usersServiceUrl: string;
    usersServicePort: number;
    connectionsServiceUrl: string;
    connectionsServicePort: number;
    connectionsServiceRedisHost: string;
    connectionsServiceRedisPort: number;
  }): DynamicModule {
    return {
      module: EsportsApiFeatureConnectionsModule,
      imports: [EsportsApiSharedProxyClientsModule.forRoot(options)],
      controllers: [EsportsApiFeatureConnectionsController],
      providers: [EsportsApiFeatureConnectionsService],
      exports: [],
    };
  }
}
