import { createAction, props } from '@ngrx/store';
import {
  ChatShortDetails,
  GetMessage,
  GetMessageFromChat,
  SendMessageToChat,
} from '@project-assignment/shared/data-models-api';

export const initChats = createAction('[ChatMessages Page] Init chats');
export const initChatMessages = createAction(
  '[ChatMessages Page] Init chat messages',
  props<{ chat: ChatShortDetails }>(),
);

export const loadChatsSuccess = createAction(
  '[ChatMessages/API] Load Chats Success',
  props<{ chats: ChatShortDetails[] }>(),
);

export const loadChatsFailure = createAction('[ChatMessages/API] Load Chats Failure', props<{ error: string }>());

export const loadChatMessagesSuccess = createAction(
  '[ChatMessages/API] Load Chat Messages Success',
  props<{ chat: ChatShortDetails; messages: GetMessage[] }>(),
);
export const loadChatMessagesFailure = createAction(
  '[ChatMessages/API] Load Chat Messages Failure',
  props<{ error: string }>(),
);

export const sendMessage = createAction('[Chat page] Send message', props<{ payload: SendMessageToChat }>());
export const sendMessageSuccess = createAction(
  '[ChatMessages/API] Send message success',
  props<{ payload: GetMessageFromChat }>(),
);

export const messageReceived = createAction('[Chat page] Message received', props<{ payload: GetMessageFromChat }>());
export const closeSelectedChat = createAction('[ChatMessages Page] Close selected chat');
