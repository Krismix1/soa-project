import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersServiceProxy } from '@project-assignment/esports-api/shared-proxy-clients';
import { User, UserDetails } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { Observable, switchMap } from 'rxjs';

@Controller('users')
export class UsersGateway {
  constructor(private userService: UsersServiceProxy) {}

  @Get('me')
  getCurrentUserProfile(@Req() req: Request): Observable<UserDetails> {
    return this.userService.mapOne(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserDetails> {
    const user$ = this.userService.findOneById(+id);
    return user$.pipe(switchMap((user) => this.userService.mapOne(user)));
  }
}
