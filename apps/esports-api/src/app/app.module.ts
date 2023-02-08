import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EsportsApiFeatureMessagesModule } from '@project-assignment/esports-api/feature-messages';
import { PostModule } from '@project-assignment/esports-api/feature-posts';
import { EsportsApiSharedProxyClientsModule } from '@project-assignment/esports-api/shared-proxy-clients';
import { environment } from '../environments/environment';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { AuthGateway } from './gateways/auth.gateway';
import { ConnectionsGateway } from './gateways/connections.gateway';
import { UsersGateway } from './gateways/users.gateway';

@Module({
  imports: [
    EsportsApiSharedProxyClientsModule.forRoot({
      authServiceUrl: environment.authServiceUrl,
      authServicePort: environment.authServicePort,
      usersServiceUrl: environment.usersServiceUrl,
      usersServicePort: environment.usersServicePort,
      connectionsServiceUrl: environment.connectionsServiceUrl,
      connectionsServicePort: environment.connectionsServicePort,
      connectionsServiceRedisHost: environment.connectionsServiceRedisHost,
      connectionsServiceRedisPort: environment.connectionsServiceRedisPort,
    }),
    PostModule,
    EsportsApiFeatureMessagesModule,
  ],
  controllers: [UsersGateway, AuthGateway, ConnectionsGateway],
  providers: [LocalStrategy, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
