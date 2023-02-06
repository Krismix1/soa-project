import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EventsAppModule } from './app/events-app.module';
import { ReqResAppModule } from './app/req-res-app.module';

async function bootstrap() {
  const reqResApp = await NestFactory.createMicroservice<MicroserviceOptions>(ReqResAppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8889,
    },
  });

  const eventsApp = await NestFactory.createMicroservice<MicroserviceOptions>(EventsAppModule, {
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
    },
  });
  await Promise.all([reqResApp.listen(), eventsApp.listen()]);
}

bootstrap();
