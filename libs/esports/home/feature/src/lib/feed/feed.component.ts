import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { EsportsPostsDataAccessModule, PostsFacade } from '@project-assignment/esports/posts/data-access';
import { CreatePostComponent, EsportsPostsFeatureComponent } from '@project-assignment/esports/posts/feature';

@Component({
  selector: 'project-assignment-feed',
  standalone: true,
  imports: [CommonModule, EsportsPostsFeatureComponent, CreatePostComponent, EsportsPostsDataAccessModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  posts$ = this.postsFacade.allPosts$;

  @ViewChild(CreatePostComponent) createPostComponent: CreatePostComponent | undefined;

  constructor(private postsFacade: PostsFacade) {}

  ngOnInit(): void {
    this.postsFacade.init();
  }

  postCreated(postData: { content: string; attachment?: File }): void {
    this.postsFacade.createPost({ content: postData.content }, postData.attachment).subscribe(() => {
      this.createPostComponent?.resetForm();
    });
  }
}
