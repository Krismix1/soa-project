import { Module } from '@nestjs/common';
import { EsportsApiFeatureUsersModule } from '@project-assignment/esports-api/feature-users';
import { PostController } from './post.controller';
import { PostService, PostToDTOMapper } from './post.service';
import { StorageService } from './storage/storage.service';

@Module({
  controllers: [PostController],
  providers: [PostService, StorageService, PostToDTOMapper],
  imports: [EsportsApiFeatureUsersModule],
})
export class PostModule {}
