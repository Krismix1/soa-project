import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ChatMessagesActions from './chat-messages.actions';

import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ChatMessagesService } from '../chat-messages.service';
import { ChatMessagesSocket } from '../chat-messages.socket';

@Injectable()
export class ChatMessagesEffects {
  private actions$ = inject(Actions);
  private chatMessagesSocket = inject(ChatMessagesSocket);
  private chatMessagesService = inject(ChatMessagesService);

  loadChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatMessagesActions.initChats),
      exhaustMap(() => {
        return this.chatMessagesService.getAllChats().pipe(
          switchMap((chats) => of(ChatMessagesActions.loadChatsSuccess({ chats }))),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(ChatMessagesActions.loadChatsFailure({ error: error.statusText }));
          }),
        );
      }),
    );
  });

  loadChatMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatMessagesActions.initChatMessages),
      exhaustMap((action) => {
        return this.chatMessagesService.getMessageForChat(action.chat).pipe(
          switchMap((messages) => of(ChatMessagesActions.loadChatMessagesSuccess({ chat: action.chat, messages }))),
          catchError((error: HttpErrorResponse) => {
            console.error('Error', error);
            return of(ChatMessagesActions.loadChatMessagesFailure({ error: error.statusText }));
          }),
        );
      }),
    );
  });

  messageReceived$ = createEffect(() => {
    return this.chatMessagesSocket
      .messageReceived$()
      .pipe(map((message) => ChatMessagesActions.messageReceived({ payload: message })));
  });

  sendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatMessagesActions.sendMessage),
      exhaustMap((action) => {
        return this.chatMessagesSocket
          .sendMessage(action.payload)
          .pipe(map((response) => ChatMessagesActions.sendMessageSuccess({ payload: response })));
      }),
    );
  });
}
