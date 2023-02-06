import { Module } from '@nestjs/common';
import { EsportsApiFeatureAuthModule } from '@project-assignment/esports-api/feature-auth';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';


@Module({
  imports: [EsportsApiFeatureUsersModule, EsportsApiFeatureAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
