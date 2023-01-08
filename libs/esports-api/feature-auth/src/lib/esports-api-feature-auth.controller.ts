import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EsportsApiFeatureUsersService, User } from '@project-assignment/esports-api/feature-users';
import { CreateUserDto } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { Public } from './anon';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class EsportsApiFeatureAuthController {
  constructor(private authService: EsportsApiFeatureAuthService, private userService: EsportsApiFeatureUsersService) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, 10);
  }
}
