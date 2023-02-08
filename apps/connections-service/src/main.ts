import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EventsAppModule } from './app/events-app.module';
import { ReqResAppModule } from './app/req-res-app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const reqResApp = await NestFactory.createMicroservice<MicroserviceOptions>(ReqResAppModule, {
    transport: Transport.TCP,
    options: {
      host: environment.connectionsServiceUrl,
      port: environment.connectionsServicePort,
    },
  });

  const eventsApp = await NestFactory.createMicroservice<MicroserviceOptions>(EventsAppModule, {
    transport: Transport.REDIS,
    options: {
      host: environment.connectionsServiceRedisHost,
      port: environment.connectionsServiceRedisPort,
    },
  });
  await Promise.all([reqResApp.listen(), eventsApp.listen()]);
}

bootstrap();
