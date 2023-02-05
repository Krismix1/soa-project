import { Action, createReducer, on } from '@ngrx/store';
import { ChatShortDetails, GenericId, GetMessage } from '@project-assignment/shared/data-models-api';

import * as ChatMessagesActions from './chat-messages.actions';

export const CHAT_MESSAGES_FEATURE_KEY = 'chatMessages';

export interface ChatMessagesState {
  selectedId?: GenericId;
  error?: string | null; // last known error (if any)
  chats: ChatShortDetails[];
  messages: { [chatId: GenericId]: GetMessage[] };
}

export interface ChatMessagesPartialState {
  readonly [CHAT_MESSAGES_FEATURE_KEY]: ChatMessagesState;
}

export const initialChatMessagesState: ChatMessagesState = {
  chats: [],
  messages: {},
};

const reducer = createReducer(
  initialChatMessagesState,
  on(ChatMessagesActions.initChats, (state): ChatMessagesState => ({ ...state, error: null })),
  on(
    ChatMessagesActions.initChatMessages,
    (state, { chat }): ChatMessagesState => ({ ...state, selectedId: chat.id, error: null }),
  ),
  on(ChatMessagesActions.loadChatsSuccess, (state, { chats }): ChatMessagesState => ({ ...state, chats })),
  on(ChatMessagesActions.loadChatsFailure, (state, { error }): ChatMessagesState => ({ ...state, error })),
  on(
    ChatMessagesActions.loadChatMessagesSuccess,
    (state, { chat, messages }): ChatMessagesState => ({
      ...state,
      messages: { ...state.messages, [chat.id]: messages },
    }),
  ),
  on(ChatMessagesActions.loadChatMessagesFailure, (state, { error }): ChatMessagesState => ({ ...state, error })),
  on(ChatMessagesActions.sendMessageSuccess, (state, action): ChatMessagesState => {
    const messages = [...state.messages[action.payload.chatId], action.payload.message];
    return { ...state, messages: { ...state.messages, [action.payload.chatId]: messages } };
  }),
  on(ChatMessagesActions.messageReceived, (state, action): ChatMessagesState => {
    const messages: GetMessage[] = [...(state.messages[action.payload.chatId] ?? []), action.payload.message];
    return { ...state, messages: { ...state.messages, [action.payload.chatId]: messages } };
  }),
  on(ChatMessagesActions.closeSelectedChat, (state): ChatMessagesState => {
    const selectedChat = state.selectedId;
    const messages = { ...state.messages };
    if (selectedChat && messages[selectedChat]) {
      delete messages[selectedChat];
    }
    return { ...state, messages };
  }),
);

export function chatMessagesReducer(state: ChatMessagesState | undefined, action: Action): ChatMessagesState {
  return reducer(state, action);
}
