import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ChatEntity,
  ChatShortDetails,
  CreateChatDTO,
  GenericId,
  GetMessage,
  SendMessage,
  UserDetails,
} from '@project-assignment/shared/data-models-api';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class EsportsApiFeatureMessagesService {
  private chats: ChatEntity[] = [
    {
      id: '1',
      title: 'Hello there',
      profilePic: '',
      members: [
        {
          id: 1,
          username: 'john',
        },
        {
          id: 2,
          username: 'maria',
        },
        {
          id: 3,
          username: 'john2',
        },
      ],
    },
    {
      id: '2',
      title: 'Chat 2',
      profilePic: '',
      members: [
        {
          id: 1,
          username: 'john',
        },
        {
          id: 3,
          username: 'john2',
        },
      ],
    },
  ];
  private messagesDB: { [chatId: GenericId]: GetMessage[] } = {};

  getChatsForUser(user?: UserDetails): ChatEntity[] {
    return user ? this.chats.filter((chat) => this.userBelongsToChat(chat, user)) : this.chats;
  }

  getChatById(id: GenericId): ChatEntity | undefined {
    return this.chats.find((c) => c.id === id);
  }

  createChat(currentUser: UserDetails, chatInfo: CreateChatDTO): ChatShortDetails {
    const chat: ChatEntity = {
      id: uuid4(),
      title: chatInfo.user.username,
      profilePic: '',
      members: [currentUser, chatInfo.user],
    };

    this.chats.push(chat);
    return chat;
  }

  saveMessage(chat: ChatShortDetails, message: SendMessage): GetMessage {
    const chatEntity = this.getChatById(chat.id);
    if (!chat) {
      throw new HttpException(`Chat with ID ${chatEntity.id} does not exist`, HttpStatus.NOT_FOUND);
    }
    if (!this.userBelongsToChat(chatEntity, message.from)) {
      throw new HttpException('Current user does not belong to chat', HttpStatus.FORBIDDEN);
    }

    const newMessage: GetMessage = {
      ...message,
      id: uuid4(),
    };
    const messages: GetMessage[] = [...(this.messagesDB[chat.id] ?? []), newMessage];
    this.messagesDB[chat.id] = messages;
    return newMessage;
  }

  getChatMessages(chatId: GenericId, currentUser): GetMessage[] {
    const chat = this.getChatById(chatId);
    if (!chat) {
      throw new HttpException(`Chat with ID ${chatId} does not exist`, HttpStatus.NOT_FOUND);
    }
    if (!this.userBelongsToChat(chat, currentUser)) {
      throw new HttpException('Current user does not belong to chat', HttpStatus.FORBIDDEN);
    }
    return this.messagesDB[chat.id] ?? [];
  }

  private userBelongsToChat(chat: ChatEntity, user: UserDetails): boolean {
    return chat.members.find((member) => member.id === user.id) !== undefined;
  }
}
