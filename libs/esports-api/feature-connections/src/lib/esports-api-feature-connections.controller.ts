import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EsportsApiFeatureUsersService, User, UserToDTOMapper } from '@project-assignment/esports-api/feature-users';
import {
  FriendConnection,
  GetConnectionDTO,
  IncomingPendingConnection,
  OutgoingPendingConnection,
  RequestConnectionDTO,
} from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Controller('connections')
export class EsportsApiFeatureConnectionsController {
  constructor(
    private esportsApiFeatureConnectionsService: EsportsApiFeatureConnectionsService,
    private userService: EsportsApiFeatureUsersService,
    private userMapper: UserToDTOMapper,
  ) {}

  @Post('/request')
  async requestConnection(@Req() req: Request, @Body() body: RequestConnectionDTO) {
    const currentUser = req.user as User;
    const connectionId = await this.esportsApiFeatureConnectionsService.requestConnection(
      currentUser.id.toString(),
      body.toUser,
    );
    return {
      id: connectionId,
    };
  }

  @Post('/accept')
  async acceptConnection(@Req() req: Request, @Body() body: RequestConnectionDTO) {
    const currentUser = req.user as User;
    return await this.esportsApiFeatureConnectionsService.acceptConnection(currentUser.id.toString(), body.toUser);
  }

  @Post('/reject')
  async rejectConnection(@Req() req: Request, @Body() body: RequestConnectionDTO) {
    const currentUser = req.user as User;
    return await this.esportsApiFeatureConnectionsService.deleteConnection(currentUser.id.toString(), body.toUser);
  }

  @Get(':id')
  async getConnections(@Param('id') id: string, @Req() req: Request): Promise<GetConnectionDTO[]> {
    const currentUser = req.user as User;
    const connections = await this.esportsApiFeatureConnectionsService.getConnections(id, {
      includePending: currentUser.id === +id,
    });
    return connections.map((connection): GetConnectionDTO => {
      const isOutgoingConnection = 'to' in connection;
      const user = isOutgoingConnection ? connection.to : connection.from;
      if (isOutgoingConnection) {
        return {
          id: connection.id,
          type: connection.type,
          to: this.userMapper.mapOne(this.userService.findOneById(+user)),
        } as OutgoingPendingConnection | FriendConnection;
      }
      return {
        id: connection.id,
        type: connection.type,
        from: this.userMapper.mapOne(this.userService.findOneById(+user)),
      } as IncomingPendingConnection;
    });
  }
}
