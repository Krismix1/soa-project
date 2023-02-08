import { Module } from '@nestjs/common';
import { EsportsApiFeatureAuthModule } from '@project-assignment/esports-api/feature-auth';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';
import { environment } from '../environments/environment';

@Module({
  imports: [
    EsportsApiFeatureUsersModule,
    EsportsApiFeatureAuthModule.forRoot({
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
export class AppModule {}
