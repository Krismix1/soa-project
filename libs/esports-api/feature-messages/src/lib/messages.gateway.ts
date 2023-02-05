import { UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import {
  GenericId,
  GetMessage,
  GetMessageFromChat,
  SendMessageToChat,
} from '@project-assignment/shared/data-models-api';

import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EsportsApiFeatureMessagesService } from './esports-api-feature-messages.service';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

const chatRoomId = (chatId: GenericId) => `chat-room-${chatId}`;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'messages',
  transports: ['websocket'], // see warning: https://docs.nestjs.com/websockets/adapter#extend-socketio
  // perMessageDeflate: {
  //   // https://stackoverflow.com/a/74794042
  //   threshold: 2048, // defaults to 1024

  //   zlibDeflateOptions: {
  //     chunkSize: 8 * 1024, // defaults to 16 * 1024
  //   },

  //   zlibInflateOptions: {
  //     windowBits: 14, // defaults to 15
  //     memLevel: 7, // defaults to 8
  //   },

  //   clientNoContextTakeover: true, // defaults to negotiated value.
  //   serverNoContextTakeover: true, // defaults to negotiated value.
  //   serverMaxWindowBits: 10, // defaults to negotiated value.

  //   concurrencyLimit: 20, // defaults to 10
  // },
  // https://github.com/socketio/socket.io/issues/2557#issuecomment-896490014
  allowEIO3: true,
})
export class MessagesGateway implements OnGatewayConnection {
  constructor(private chatsService: EsportsApiFeatureMessagesService) {}

  handleConnection(client: Socket) {
    this.chatsService.getChatsForUser().forEach((chat) => client.join(chatRoomId(chat.id)));
  }

  @SubscribeMessage('chat-message')
  @UseFilters(new AllExceptionsFilter())
  // @UseGuards(AuthGuard)
  // incomingChatMessage(@MessageBody() data: SendMessageToChat): Observable<WsResponse<number>> {
  incomingChatMessage(@ConnectedSocket() client: Socket, @MessageBody() data: SendMessageToChat) {
    const chat = this.chatsService.getChatById(data.chatId);
    if (!chat) {
      throw new WsException(`Could not find chat with ID ${data.chatId}`);
    }
    const message: GetMessage = this.chatsService.saveMessage(chat, data.message);
    const broadCastPayload: GetMessageFromChat = {
      chatId: chat.id,
      message,
    };
    client.to(chatRoomId(chat.id)).emit('chat-message', broadCastPayload);
    return {
      event: 'chat-message-received',
      data: broadCastPayload,
    };
  }
}
