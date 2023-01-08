import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'project-assignment-user-profile',
  standalone: true,
  imports: [CommonModule, GravatarModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  @Input() userDetails!: UserDetails;
}
