import { Module } from '@nestjs/common';
import { EsportsApiFeatureAuthModule } from '@project-assignment/esports-api/feature-auth';
import { PostModule } from '@project-assignment/esports-api/feature-posts';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';

@Module({
  imports: [EsportsApiFeatureAuthModule, PostModule, EsportsApiFeatureUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
