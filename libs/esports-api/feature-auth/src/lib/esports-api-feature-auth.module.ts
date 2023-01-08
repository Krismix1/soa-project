import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';
import { jwtConstants } from './constants';
import { EsportsApiFeatureAuthController } from './esports-api-feature-auth.controller';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    EsportsApiFeatureUsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
  ],
  controllers: [EsportsApiFeatureAuthController],
  providers: [EsportsApiFeatureAuthService, LocalStrategy, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [EsportsApiFeatureAuthService],
})
export class EsportsApiFeatureAuthModule {}
