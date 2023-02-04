import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetConnectionDTO, RequestConnectionDTO } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

@Injectable()
export class ConnectionsService {
  constructor(private http: HttpClient) {}

  deleteConnection = this.rejectConnection;

  getConnections(id: string | number): Observable<GetConnectionDTO[]> {
    return this.http.get<GetConnectionDTO[]>(`/api/connections/${id}`);
  }

  requestConnection(toUserId: string | number): Observable<void> {
    const payload: RequestConnectionDTO = { toUser: toUserId.toString() };
    return this.http.post<void>('/api/connections/request', payload);
  }

  acceptConnection(toUserId: string | number): Observable<void> {
    const payload: RequestConnectionDTO = { toUser: toUserId.toString() };
    return this.http.post<void>('/api/connections/accept', payload);
  }

  rejectConnection(toUserId: string | number): Observable<void> {
    const payload: RequestConnectionDTO = { toUser: toUserId.toString() };
    return this.http.post<void>('/api/connections/reject', payload);
  }
}
