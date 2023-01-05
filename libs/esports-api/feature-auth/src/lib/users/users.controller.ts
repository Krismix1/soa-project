import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Get('me')
  getProfile(@Req() req: Request): UserDetails {
    return req.user as UserDetails;
  }
}
