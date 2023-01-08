import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, PartialType } from '@nestjs/swagger';
import { User } from '@project-assignment/esports-api/feature-users';
import { CreatePostDto, GetPostDto } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import 'multer';
import { PostService, PostToDTOMapper } from './post.service';
import multer = require('multer');

export class UpdatePostDtoS extends PartialType(CreatePostDto) {}

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService, private readonly mapper: PostToDTOMapper) {}

  @Post()
  @UseInterceptors(FileInterceptor('attachment', { storage: multer.memoryStorage(), limits: { files: 1 } }))
  async create(
    @Req() req: Request,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /png|jpeg|jpg|gif/,
        })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    const user = req.user as User;
    const post = await this.postService.create(createPostDto, file, user.id);
    return await this.mapper.mapOne(post);
  }

  @Get()
  async findAll(): Promise<GetPostDto[]> {
    return await this.mapper.mapMany(this.postService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetPostDto> {
    const post = this.postService.findOne(+id);
    return await this.mapper.mapOne(post);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDtoS) {
    return this.postService.update(+id, updatePostDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(+id);
  }
}
