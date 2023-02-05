import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatShortDetails, GetMessage, UserDetails } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

@Injectable()
export class ChatMessagesService {
  constructor(private http: HttpClient) {}

  createChat(withUser: UserDetails): Observable<ChatShortDetails> {
    return this.http.post<ChatShortDetails>('/api/chats', { withUser });
  }

  getAllChats(): Observable<ChatShortDetails[]> {
    return this.http.get<ChatShortDetails[]>('/api/chats');
  }

  getMessageForChat(chat: ChatShortDetails): Observable<GetMessage[]> {
    return this.http.get<GetMessage[]>(`/api/chats/${chat.id}/messages`);
  }
}
