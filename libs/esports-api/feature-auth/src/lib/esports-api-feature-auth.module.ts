import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';
import { EsportsApiSharedProxyClientsModule } from '@project-assignment/esports-api/shared-proxy-clients';
import { jwtConstants } from '@project-assignment/shared/data-models-api';
import { EsportsApiFeatureAuthController } from './esports-api-feature-auth.controller';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';

@Module({
  imports: [
    EsportsApiFeatureUsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
    EsportsApiSharedProxyClientsModule,
  ],
  controllers: [EsportsApiFeatureAuthController],
  providers: [EsportsApiFeatureAuthService],
  exports: [EsportsApiFeatureAuthService],
})
export class EsportsApiFeatureAuthModule {}
