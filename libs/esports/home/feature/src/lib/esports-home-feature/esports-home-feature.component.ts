import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EsportsPostsDataAccessModule, PostsFacade } from '@project-assignment/esports/posts/data-access';
import { CreatePostComponent, EsportsPostsFeatureComponent } from '@project-assignment/esports/posts/feature';

@Component({
  selector: 'project-assignment-esports-home-feature',
  standalone: true,
  imports: [CommonModule, EsportsPostsFeatureComponent, EsportsPostsDataAccessModule, CreatePostComponent],
  templateUrl: './esports-home-feature.component.html',
  styleUrls: ['./esports-home-feature.component.scss'],
})
export class EsportsHomeFeatureComponent implements OnInit {
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
