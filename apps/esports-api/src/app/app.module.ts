import { Module } from '@nestjs/common';
import { EsportsApiFeatureAuthModule } from '@project-assignment/esports-api/feature-auth';

@Module({
  imports: [EsportsApiFeatureAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
