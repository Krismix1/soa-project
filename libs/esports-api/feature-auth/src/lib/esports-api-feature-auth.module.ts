import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';
import { EsportsApiSharedProxyClientsModule } from '@project-assignment/esports-api/shared-proxy-clients';
import { jwtConstants } from '@project-assignment/shared/data-models-api';
import { EsportsApiFeatureAuthController } from './esports-api-feature-auth.controller';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';

@Module({})
export class EsportsApiFeatureAuthModule {
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
      imports: [
        EsportsApiFeatureUsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '900s' },
        }),
        EsportsApiSharedProxyClientsModule.forRoot({
          authServiceUrl: options.authServiceUrl,
          authServicePort: options.authServicePort,
          usersServiceUrl: options.usersServiceUrl,
          usersServicePort: options.usersServicePort,
          connectionsServiceUrl: options.connectionsServiceUrl,
          connectionsServicePort: options.connectionsServicePort,
          connectionsServiceRedisHost: options.connectionsServiceRedisHost,
          connectionsServiceRedisPort: options.connectionsServiceRedisPort,
        }),
      ],
      module: EsportsApiFeatureAuthModule,
      controllers: [EsportsApiFeatureAuthController],
      providers: [EsportsApiFeatureAuthService],
      exports: [EsportsApiFeatureAuthService],
    };
  }
}
