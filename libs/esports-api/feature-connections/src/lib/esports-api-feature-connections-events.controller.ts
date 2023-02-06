import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EsportsApiFeatureConnectionsService } from './esports-api-feature-connections.service';

@Controller()
export class EsportsApiFeatureConnectionsEventsController {
  constructor(private esportsApiFeatureConnectionsService: EsportsApiFeatureConnectionsService) {}

  @EventPattern('user_created')
  async handleUserCreated(data: { id: string }) {
    console.log('received event that user created', data);
    this.esportsApiFeatureConnectionsService.createUser(data.id);
  }
}
