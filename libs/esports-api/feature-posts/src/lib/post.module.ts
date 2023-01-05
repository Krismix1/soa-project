import { Module } from '@nestjs/common';
import { UsersModule } from '@project-assignment/esports-api/feature-auth';
import { PostController } from './post.controller';
import { PostService, PostToDTOMapper } from './post.service';
import { StorageService } from './storage/storage.service';

@Module({
  controllers: [PostController],
  providers: [PostService, StorageService, PostToDTOMapper],
  imports: [UsersModule],
})
export class PostModule {}
