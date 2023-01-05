import { createAction, props } from '@ngrx/store';
import { CreatePostDto } from '@project-assignment/shared/data-models-api';
import { GetPostDto } from './posts.models';

export const initPosts = createAction('[Posts Page] Init');
export const loadPostsSuccess = createAction('[Posts/API] Load Posts Success', props<{ posts: GetPostDto[] }>());
export const loadPostsFailure = createAction('[Posts/API] Load Posts Failure', props<{ error: string }>());

export const createPost = createAction('[Posts Page] Create post', props<{ post: CreatePostDto; attachment?: File }>());
export const createPostSuccess = createAction('[Posts/API] Create post Success');
export const createPostFailure = createAction('[Posts/API] Create post Failure', props<{ error: string }>());
