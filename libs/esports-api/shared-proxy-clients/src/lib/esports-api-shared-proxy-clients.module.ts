import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthServiceProxy } from './proxies/auth.proxy';
import { ConnectionsServiceProxy } from './proxies/connections.proxy';
import { UsersServiceProxy } from './proxies/users.proxy';

@Module({})
export class EsportsApiSharedProxyClientsModule {
  static forRoot(options: {
    authServiceUrl: string;
    authServicePort: number;
    usersServiceUrl: string;
    usersServicePort: number;
    connectionsServiceUrl: string;
    connectionsServicePort: number;
    connectionsServiceRedisHost: string;
    connectionsServiceRedisPort: number;
  }): DynamicModule {
    return {
      imports: [
        ClientsModule.register([
          {
            name: 'AUTH_SERVICE',
            transport: Transport.TCP,
            options: {
              host: options.authServiceUrl,
              port: options.authServicePort,
            },
          },
          {
            name: 'USERS_SERVICE',
            transport: Transport.TCP,
            options: {
              host: options.usersServiceUrl,
              port: options.usersServicePort,
            },
          },
          {
            name: 'CONNECTIONS_SERVICE_REQ_RES',
            transport: Transport.TCP,
            options: {
              host: options.connectionsServiceUrl,
              port: options.connectionsServicePort,
            },
          },
          {
            name: 'CONNECTIONS_SERVICE_EVENTS',
            transport: Transport.REDIS,
            options: {
              host: options.connectionsServiceRedisHost,
              port: options.connectionsServiceRedisPort,
            },
          },
        ]),
      ],
      module: EsportsApiSharedProxyClientsModule,
      providers: [AuthServiceProxy, UsersServiceProxy, ConnectionsServiceProxy],
      exports: [AuthServiceProxy, UsersServiceProxy, ConnectionsServiceProxy],
    };
  }
}
