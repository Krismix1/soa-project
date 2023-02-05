import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChatShortDetails, SendMessageToChat } from '@project-assignment/shared/data-models-api';

import * as ChatMessagesActions from './chat-messages.actions';
import * as ChatMessagesSelectors from './chat-messages.selectors';

@Injectable()
export class ChatMessagesFacade {
  private readonly store = inject(Store);

  allChats$ = this.store.pipe(select(ChatMessagesSelectors.selectAllChats));
  selectedChat$ = this.store.pipe(select(ChatMessagesSelectors.selectSelectedChat));
  selectedChatMessages$ = this.store.pipe(select(ChatMessagesSelectors.selectAllChatMessages));

  initChats() {
    this.store.dispatch(ChatMessagesActions.initChats());
  }

  loadChatMessages(chat: ChatShortDetails) {
    this.store.dispatch(ChatMessagesActions.initChatMessages({ chat }));
  }

  sendMessage(payload: SendMessageToChat) {
    this.store.dispatch(ChatMessagesActions.sendMessage({ payload }));
  }

  closeSelectedChat() {
    this.store.dispatch(ChatMessagesActions.closeSelectedChat());
  }
}
