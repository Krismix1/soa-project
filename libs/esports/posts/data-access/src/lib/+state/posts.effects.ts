import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostsService } from '../posts.service';

import * as PostsActions from './posts.actions';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.initPosts),
      switchMap(() => {
        return this.postsService.findAll().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((err: HttpErrorResponse) => of(PostsActions.loadPostsFailure({ error: err.message }))),
        );
      }),
      // fetch({
      //   run: () => {
      //     return this.postsService.findAll().pipe(
      //       map((posts) => PostsActions.loadPostsSuccess({ posts })),
      //       catchError((err: HttpErrorResponse) => of(PostsActions.loadPostsFailure({ error: err.message }))),
      //     );
      //   },
      //   onError: () => null,
      // }),
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.createPost),
      switchMap((action) => {
        return this.postsService.createPost(action.post, action.attachment).pipe(
          map(() => PostsActions.createPostSuccess()),
          catchError((err: HttpErrorResponse) => of(PostsActions.createPostFailure({ error: err.message }))),
        );
      }),
      // fetch({
      //   run: (action) => {
      //     return this.postsService
      //       .createPost(action.post, action.attachment)
      //       .pipe(map(() => PostsActions.createPostSuccess()));
      //   },
      //   onError: () => {
      //     return null;
      //   },
      // }),
    );
  });

  refreshPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.createPostSuccess),
      map(() => PostsActions.initPosts()),
    );
  });
}
