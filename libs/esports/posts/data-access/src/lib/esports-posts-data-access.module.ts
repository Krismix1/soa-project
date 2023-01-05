import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PostsEffects } from './+state/posts.effects';
import { PostsFacade } from './+state/posts.facade';
import * as fromPosts from './+state/posts.reducer';
import { PostsService } from './posts.service';

@NgModule({
  providers: [
    PostsFacade,
    provideEffects([PostsEffects]),
    provideState(fromPosts.POSTS_FEATURE_KEY, fromPosts.postsReducer),
    PostsService,
  ],
})
export class EsportsPostsDataAccessModule {}
