import { Controller, OnModuleInit } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersServiceProxy } from '@project-assignment/esports-api/shared-proxy-clients';
import {
  FriendConnection,
  GetConnectionDTO,
  IncomingPendingConnection,
  OutgoingPendingConnection,
  RequestConnectionDTO,
  User,
} from '@project-assignment/shared/data-models-api';
import { combineLatest, defaultIfEmpty, map, Observable, switchMap } from 'rxjs';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Controller()
export class EsportsApiFeatureConnectionsController implements OnModuleInit {
  constructor(
    private esportsApiFeatureConnectionsService: EsportsApiFeatureConnectionsService,
    private userService: UsersServiceProxy,
  ) {}

  async onModuleInit() {
    await this.esportsApiFeatureConnectionsService.onModuleInit();
    await this.esportsApiFeatureConnectionsService.loadDummyData();
  }

  @MessagePattern({ cmd: 'request_connection' })
  async requestConnection(data: { currentUser: User; payload: RequestConnectionDTO }): Promise<{ id: number }> {
    const connectionId = await this.esportsApiFeatureConnectionsService.requestConnection(
      data.currentUser.id.toString(),
      data.payload.toUser,
    );
    return {
      id: connectionId,
    };
  }

  @MessagePattern({ cmd: 'accept_connection' })
  async acceptConnection(data: { currentUser: User; payload: RequestConnectionDTO }): Promise<void> {
    return await this.esportsApiFeatureConnectionsService.acceptConnection(
      data.currentUser.id.toString(),
      data.payload.toUser,
    );
  }

  @MessagePattern({ cmd: 'reject_connection' })
  async rejectConnection(data: { currentUser: User; payload: RequestConnectionDTO }): Promise<void> {
    return await this.esportsApiFeatureConnectionsService.deleteConnection(
      data.currentUser.id.toString(),
      data.payload.toUser,
    );
  }

  @MessagePattern({ cmd: 'get_connections' })
  async getConnections(data: { id: string; currentUser: User }): Promise<Observable<GetConnectionDTO[]>> {
    const { id, currentUser } = data;
    const connections = await this.esportsApiFeatureConnectionsService.getConnections(id, {
      includePending: currentUser.id === +id,
    });
    return combineLatest(
      connections.map((connection): Observable<GetConnectionDTO> => {
        const isOutgoingConnection = 'to' in connection;
        const user = isOutgoingConnection ? connection.to : connection.from;
        if (isOutgoingConnection) {
          return this.userService.findOneById(+user).pipe(
            switchMap((user) => this.userService.mapOne(user)),
            map(
              (userDetails) =>
                ({
                  id: connection.id,
                  type: connection.type,
                  to: userDetails,
                } as OutgoingPendingConnection | FriendConnection),
            ),
          );
        }
        return this.userService.findOneById(+user).pipe(
          switchMap((user) => this.userService.mapOne(user)),
          map(
            (userDetails) =>
              ({
                id: connection.id,
                type: connection.type,
                from: userDetails,
              } as IncomingPendingConnection),
          ),
        );
      }),
    ).pipe(defaultIfEmpty([]));
  }
}
