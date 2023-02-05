import { Module } from '@nestjs/common';
import { EsportsApiFeatureMessagesController } from './esports-api-feature-messages.controller';
import { EsportsApiFeatureMessagesService } from './esports-api-feature-messages.service';
import { MessagesGateway } from './messages.gateway';

@Module({
  controllers: [EsportsApiFeatureMessagesController],
  providers: [EsportsApiFeatureMessagesService, MessagesGateway],
  exports: [EsportsApiFeatureMessagesService],
})
export class EsportsApiFeatureMessagesModule {}
