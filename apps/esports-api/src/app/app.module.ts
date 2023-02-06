import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EsportsApiFeatureMessagesModule } from '@project-assignment/esports-api/feature-messages';
import { PostModule } from '@project-assignment/esports-api/feature-posts';
import { EsportsApiSharedProxyClientsModule } from '@project-assignment/esports-api/shared-proxy-clients';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { AuthGateway } from './gateways/auth.gateway';
import { ConnectionsGateway } from './gateways/connections.gateway';
import { UsersGateway } from './gateways/users.gateway';

@Module({
  imports: [EsportsApiSharedProxyClientsModule, PostModule, EsportsApiFeatureMessagesModule],
  controllers: [UsersGateway, AuthGateway, ConnectionsGateway],
  providers: [LocalStrategy, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
