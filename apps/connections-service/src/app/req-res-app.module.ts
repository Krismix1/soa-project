import { Module } from '@nestjs/common';
import { EsportsApiFeatureConnectionsModule } from '@project-assignment/esports-api/feature-connections';
import { environment } from '../environments/environment';

@Module({
  imports: [
    EsportsApiFeatureConnectionsModule.forRoot({
      authServiceUrl: environment.authServiceUrl,
      authServicePort: environment.authServicePort,
      usersServiceUrl: environment.usersServiceUrl,
      usersServicePort: environment.usersServicePort,
      connectionsServiceUrl: environment.connectionsServiceUrl,
      connectionsServicePort: environment.connectionsServicePort,
      connectionsServiceRedisHost: environment.connectionsServiceRedisHost,
      connectionsServiceRedisPort: environment.connectionsServiceRedisPort,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ReqResAppModule {}
