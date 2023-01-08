import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { EsportsUsersDataAccessModule, UsersFacade } from '@project-assignment/esports/users/data-access';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'project-assignment-esports-users-feature',
  standalone: true,
  imports: [CommonModule, EsportsUsersDataAccessModule, UserProfileComponent, LetModule],
  templateUrl: './esports-users-feature.component.html',
  styleUrls: ['./esports-users-feature.component.scss'],
})
export class EsportsUsersFeatureComponent implements OnInit {
  selectedUser$ = this.usersFacade.selectedUser$;

  constructor(private route: ActivatedRoute, private usersFacade: UsersFacade) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.usersFacade.getUserDetails(id);
  }
}
