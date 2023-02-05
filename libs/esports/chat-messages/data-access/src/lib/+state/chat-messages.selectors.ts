import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatShortDetails, GenericId, GetMessage } from '@project-assignment/shared/data-models-api';
import { ChatMessagesState, CHAT_MESSAGES_FEATURE_KEY } from './chat-messages.reducer';

export const selectChatMessagesState = createFeatureSelector<ChatMessagesState>(CHAT_MESSAGES_FEATURE_KEY);

export const selectChatMessagesError = createSelector(
  selectChatMessagesState,
  (state: ChatMessagesState) => state.error,
);

export const selectAllChats = createSelector(selectChatMessagesState, (state): ChatShortDetails[] => state.chats);
export const selectAllChatMessages = createSelector(selectChatMessagesState, (state): GetMessage[] =>
  state.selectedId ? state.messages[state.selectedId] : [],
);

export const selectSelectedId = createSelector(selectChatMessagesState, (state: ChatMessagesState) => state.selectedId);

export const selectSelectedChat = createSelector(
  selectAllChats,
  selectSelectedId,
  (chats: ChatShortDetails[], selectedId: GenericId | undefined): ChatShortDetails | undefined =>
    selectedId ? chats.find((chat) => chat.id === selectedId) : undefined,
);
