import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SocketIoModule } from 'ngx-socket-io';
import { ChatMessagesEffects } from './+state/chat-messages.effects';
import { ChatMessagesFacade } from './+state/chat-messages.facade';
import * as fromChatMessages from './+state/chat-messages.reducer';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesSocket } from './chat-messages.socket';

@NgModule({
  imports: [SocketIoModule],
  providers: [
    provideEffects([ChatMessagesEffects]),
    provideState(fromChatMessages.CHAT_MESSAGES_FEATURE_KEY, fromChatMessages.chatMessagesReducer),
    ChatMessagesFacade,
    ChatMessagesSocket,
    ChatMessagesService,
  ],
})
export class EsportsChatMessagesDataAccessModule {}
