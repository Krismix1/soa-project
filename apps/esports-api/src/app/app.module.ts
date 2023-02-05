import { Module } from '@nestjs/common';
import { EsportsApiFeatureAuthModule } from '@project-assignment/esports-api/feature-auth';
import { EsportsApiFeatureConnectionsModule } from '@project-assignment/esports-api/feature-connections';
import { EsportsApiFeatureMessagesModule } from '@project-assignment/esports-api/feature-messages';
import { PostModule } from '@project-assignment/esports-api/feature-posts';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';

@Module({
  imports: [
    EsportsApiFeatureAuthModule,
    PostModule,
    EsportsApiFeatureUsersModule,
    EsportsApiFeatureConnectionsModule,
    EsportsApiFeatureMessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
