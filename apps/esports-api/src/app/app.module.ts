import { Module } from '@nestjs/common';
import { EsportsApiFeatureAuthModule } from '@project-assignment/esports-api/feature-auth';
import { PostModule } from '@project-assignment/esports-api/feature-posts';

@Module({
  imports: [EsportsApiFeatureAuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
