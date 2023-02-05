import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { User } from '@project-assignment/esports-api/feature-users';
import { ChatEntity, ChatShortDetails, CreateChatDTO, GetMessage } from '@project-assignment/shared/data-models-api';
import { Request } from 'express';
import { EsportsApiFeatureMessagesService } from './esports-api-feature-messages.service';

@Controller('chats')
export class EsportsApiFeatureMessagesController {
  constructor(private esportsApiFeatureMessagesService: EsportsApiFeatureMessagesService) {}
  @Get()
  getAllChats(@Req() req: Request): ChatEntity[] {
    const currentUser = req.user as User;
    return this.esportsApiFeatureMessagesService.getChatsForUser(currentUser);
  }

  @Post()
  createChat(@Req() req: Request, @Body() body: CreateChatDTO): ChatShortDetails {
    const currentUser = req.user as User;
    return this.esportsApiFeatureMessagesService.createChat(currentUser, body);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string, @Req() req: Request): GetMessage[] {
    const currentUser = req.user as User;
    return this.esportsApiFeatureMessagesService.getChatMessages(id, currentUser);
  }
}
