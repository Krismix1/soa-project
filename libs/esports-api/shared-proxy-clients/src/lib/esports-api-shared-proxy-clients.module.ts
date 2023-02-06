import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthServiceProxy } from './proxies/auth.proxy';
import { ConnectionsServiceProxy } from './proxies/connections.proxy';
import { UsersServiceProxy } from './proxies/users.proxy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
      {
        name: 'CONNECTIONS_SERVICE_REQ_RES',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8889,
        },
      },
      {
        name: 'CONNECTIONS_SERVICE_EVENTS',
        transport: Transport.REDIS,
        options: {
          host: '127.0.0.1',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [AuthServiceProxy, UsersServiceProxy, ConnectionsServiceProxy],
  exports: [AuthServiceProxy, UsersServiceProxy, ConnectionsServiceProxy],
})
export class EsportsApiSharedProxyClientsModule {}
