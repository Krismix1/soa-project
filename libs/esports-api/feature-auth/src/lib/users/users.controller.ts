import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request): UserDetails {
    return req.user as UserDetails;
  }
}
