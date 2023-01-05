import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePostDto } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';
import { GetPostDto } from './+state/posts.models';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(data: CreatePostDto, attachment?: File): Observable<void> {
    const formData = new FormData();
    if (attachment) {
      formData.append('attachment', attachment);
    }
    formData.append('content', data.content);

    return this.http.post<void>('/api/posts', formData);
  }

  findAll(): Observable<GetPostDto[]> {
    return this.http.get<GetPostDto[]>('/api/posts');
  }

  findOne(id: string | number): Observable<GetPostDto> {
    return this.http.get<GetPostDto>(`/api/posts/${id}`);
  }

  getUserPosts(username: string): Observable<GetPostDto[]> {
    return this.http.get<GetPostDto[]>(`/api/posts/findAll/${username}`);
  }
}
