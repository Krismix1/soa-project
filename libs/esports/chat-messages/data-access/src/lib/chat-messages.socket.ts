import { Inject, Injectable, InjectionToken } from '@angular/core';
import { GetMessageFromChat, SendMessageToChat } from '@project-assignment/shared/data-models-api';
import { Socket } from 'ngx-socket-io';
import { from, Observable } from 'rxjs';

export const MESSAGES_WS_TOKEN = new InjectionToken<string>('MESSAGES_WS_TOKEN');

@Injectable()
export class ChatMessagesSocket extends Socket {
  _messageReceived$: Observable<GetMessageFromChat> | undefined;
  constructor(@Inject(MESSAGES_WS_TOKEN) messagesWsUrl: string) {
    super({ url: `${messagesWsUrl}/messages`, options: { path: '/socket.io', transports: ['websocket'] } });
  }

  sendMessage(message: SendMessageToChat) {
    this.emit('chat-message', message);
    return from(this.fromOneTimeEvent<GetMessageFromChat>('chat-message-received'));
  }

  messageReceived$() {
    this._messageReceived$ ??= this.fromEvent<GetMessageFromChat>('chat-message');
    return this._messageReceived$;
  }
}
