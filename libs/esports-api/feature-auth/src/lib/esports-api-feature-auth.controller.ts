import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from './anon';
import { EsportsApiFeatureAuthService } from './esports-api-feature-auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

@Controller('auth')
export class EsportsApiFeatureAuthController {
  constructor(
    private authService: EsportsApiFeatureAuthService,
    private userService: UsersService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
