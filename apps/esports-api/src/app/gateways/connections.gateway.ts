import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ConnectionsServiceProxy } from '@project-assignment/esports-api/shared-proxy-clients';
import { GetConnectionDTO, RequestConnectionDTO, User } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Controller('connections')
export class ConnectionsGateway {
  constructor(private connectionsService: ConnectionsServiceProxy) {}

  @Post('/request')
  requestConnection(@Req() req: Request, @Body() body: RequestConnectionDTO): Observable<{ id: number }> {
    const currentUser = req.user as User;
    return this.connectionsService.requestConnection(currentUser, body);
  }

  @Post('/accept')
  acceptConnection(@Req() req: Request, @Body() body: RequestConnectionDTO): Observable<void> {
    const currentUser = req.user as User;
    return this.connectionsService.acceptConnection(currentUser, body);
  }

  @Post('/reject')
  rejectConnection(@Req() req: Request, @Body() body: RequestConnectionDTO): Observable<void> {
    const currentUser = req.user as User;
    return this.connectionsService.rejectConnection(currentUser, body);
  }

  @Get(':id')
  getConnections(@Param('id') id: string, @Req() req: Request): Observable<GetConnectionDTO[]> {
    const currentUser = req.user as User;
    return this.connectionsService.getConnections(id, currentUser);
  }
}
