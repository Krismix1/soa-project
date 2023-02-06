import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthServiceProxy } from '@project-assignment/esports-api/shared-proxy-clients';
import { CreateUserDto, User } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { defaultIfEmpty } from 'rxjs';
import { Public } from '../auth/anon';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthGateway {
  constructor(private authService: AuthServiceProxy) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto).pipe(defaultIfEmpty(undefined));
  }
}
