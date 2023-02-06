import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetConnectionDTO, RequestConnectionDTO, User } from '@project-assignment/shared/data-models-api';
import { defaultIfEmpty, Observable } from 'rxjs';

@Injectable()
export class ConnectionsServiceProxy {
  constructor(
    @Inject('CONNECTIONS_SERVICE_REQ_RES') private readonly connectionsTCPClientProxy: ClientProxy,
    @Inject('CONNECTIONS_SERVICE_EVENTS') private readonly connectionsRedisClientProxy: ClientProxy,
  ) {}

  requestConnection(user: User, data: RequestConnectionDTO): Observable<{ id: number }> {
    const pattern = { cmd: 'request_connection' };
    const payload = {
      currentUser: user,
      payload: data,
    };
    return this.connectionsTCPClientProxy.send<{ id: number }>(pattern, payload);
  }

  acceptConnection(user: User, data: RequestConnectionDTO): Observable<void> {
    const pattern = { cmd: 'accept_connection' };
    const payload = {
      currentUser: user,
      payload: data,
    };
    return this.connectionsTCPClientProxy.send<void>(pattern, payload).pipe(defaultIfEmpty(undefined));
  }

  rejectConnection(user: User, data: RequestConnectionDTO) {
    const pattern = { cmd: 'reject_connection' };
    const payload = {
      currentUser: user,
      payload: data,
    };
    return this.connectionsTCPClientProxy.send<void>(pattern, payload).pipe(defaultIfEmpty(undefined));
  }

  getConnections(id: string, user: User): Observable<GetConnectionDTO[]> {
    const pattern = { cmd: 'get_connections' };
    const payload = {
      id,
      currentUser: user,
    };
    return this.connectionsTCPClientProxy.send<GetConnectionDTO[]>(pattern, payload);
  }

  userCreated(userId: string): void {
    const payload = {
      id: userId,
    };
    this.connectionsRedisClientProxy.emit('user_created', payload);
  }
}
