import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'project-assignment-header',
  standalone: true,
  imports: [CommonModule, GravatarModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() user!: UserDetails;

  @Output() logOut = new EventEmitter<void>();
}
