import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { GetPostDto } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<GetPostDto> {
  selectedId?: string | number; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  error?: string | null; // last known error (if any)
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<GetPostDto> = createEntityAdapter<GetPostDto>();

export const initialPostsState: PostsState = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialPostsState,
  on(PostsActions.initPosts, (state): PostsState => ({ ...state, loaded: false, error: null })),
  on(
    PostsActions.loadPostsSuccess,
    (state, { posts }): PostsState =>
      postsAdapter.setAll(
        [...posts].sort((a, b) => b.createdAt - a.createdAt),
        { ...state, loaded: true },
      ),
  ),
  on(PostsActions.loadPostsFailure, (state, { error }): PostsState => ({ ...state, error })),
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return reducer(state, action);
}
