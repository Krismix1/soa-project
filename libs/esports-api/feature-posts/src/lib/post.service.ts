import { Injectable } from '@nestjs/common';
import { UsersService, UserToDTOMapper } from '@project-assignment/esports-api/feature-auth';
import { CreatePostDto, GetPostDto, UpdatePostDto } from '@project-assignment/shared/data-models-api';
import { Post } from './entities/post.entity';
import { StorageService } from './storage/storage.service';

@Injectable()
export class PostService {
  posts: Post[] = [
    {
      id: 1,
      content: 'Content 1',
      storedFileName: '42c2e84c-6c1a-4e82-9f6c-82f9e57c6363.gif',
      createdAt: Date.now() / 1000,
      creator: {
        id: 1,
        username: 'john',
        password: '',
      },
    },
    {
      id: 2,
      content: 'Content 2',
      storedFileName: 'a59a8259-78a4-4140-86e4-73c5febe3ffc.gif',
      createdAt: Date.now() / 1000,
      creator: {
        id: 2,
        username: 'maria',
        password: '',
      },
    },
    {
      id: 3,
      content: 'Content 2',
      storedFileName: 'a59a8259-78a4-4140-86e4-73c5febe3ffc.gif',
      createdAt: Date.now() / 1000,
      creator: {
        id: 2,
        username: 'maria',
        password: '',
      },
    },
    {
      id: 4,
      content: 'Content 2',
      storedFileName: 'a59a8259-78a4-4140-86e4-73c5febe3ffc.gif',
      createdAt: Date.now() / 1000,
      creator: {
        id: 2,
        username: 'maria',
        password: '',
      },
    },
  ];

  constructor(private userService: UsersService, private storageService: StorageService) {}

  async create(createPostDto: CreatePostDto, file: Express.Multer.File | undefined, creatorId: string): Promise<Post> {
    const creator = await this.userService.findOne(creatorId);
    const storedFileName: string | undefined = file
      ? await this.storageService.uploadFile(file.buffer, file.originalname)
      : undefined;

    const id = this.posts.length + 1;
    const newPost: Post = {
      id,
      content: createPostDto.content,
      storedFileName,
      creator,
      createdAt: Date.now() / 1000,
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((p) => p.id === id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      const newObj = {
        ...this.posts[index],
        ...updatePostDto,
      };
      this.posts[index] = newObj;
    }
  }

  async remove(id: number) {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    const post = this.posts[postIndex];
    await this.storageService.deleteFile(post.storedFileName);
    this.posts = [...this.posts.slice(postIndex), ...this.posts.slice(postIndex + 1)];

    return post;
  }

  async generateDownloadLink(post: Post): Promise<string> {
    return await this.storageService.getPresignedUrl(post.storedFileName);
  }
}

@Injectable()
export class PostToDTOMapper {
  constructor(private postService: PostService, private userMapper: UserToDTOMapper) {}

  async mapOne(post: Post): Promise<GetPostDto> {
    return {
      id: post.id,
      content: post.content,
      creator: this.userMapper.mapOne(post.creator),
      link: post.storedFileName ? await this.postService.generateDownloadLink(post) : undefined,
      createdAt: post.createdAt,
    };
  }

  async mapMany(posts: Post[]): Promise<GetPostDto[]> {
    const promises = posts.map((post) => this.mapOne(post));
    return Promise.all(promises);
  }
}
