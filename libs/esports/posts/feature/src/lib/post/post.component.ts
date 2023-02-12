import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetPostDto } from '@project-assignment/shared/data-models-api';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'project-assignment-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, GravatarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post!: GetPostDto;

  get createdAt(): Date | undefined {
    return this.post ? new Date(this.post.createdAt * 1000) : undefined;
  }
}
