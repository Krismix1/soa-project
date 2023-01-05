import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CreatePostDto } from '@project-assignment/shared/data-models-api';
import { first } from 'rxjs';
import * as PostsActions from './posts.actions';
import * as PostsSelectors from './posts.selectors';

@Injectable()
export class PostsFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.select(PostsSelectors.selectPostsLoaded);
  allPosts$ = this.store.select(PostsSelectors.selectAllPosts);
  selectedPosts$ = this.store.select(PostsSelectors.selectEntity);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(PostsActions.initPosts());
  }

  createPost(post: CreatePostDto, attachment?: File) {
    this.store.dispatch(PostsActions.createPost({ post, attachment }));
    return this.actions$.pipe(ofType(PostsActions.createPostSuccess), first());
  }
}
