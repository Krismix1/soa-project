import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GetPostDto } from '@project-assignment/shared/data-models-api';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'project-assignment-posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsPostsFeatureComponent {
  @Input() posts: GetPostDto[] = [];
}
