import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';
import { EsportsUsersDataAccessModule, UsersFacade } from '@project-assignment/esports/users/data-access';
import { FeedComponent } from '../feed/feed.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'project-assignment-esports-home-feature',
  standalone: true,
  imports: [CommonModule, EsportsUsersDataAccessModule, HeaderComponent, FeedComponent, LetModule, RouterModule],
  templateUrl: './esports-home-feature.component.html',
  styleUrls: ['./esports-home-feature.component.scss'],
})
export class EsportsHomeFeatureComponent implements OnInit {
  currentUser$ = this.userFacade.currentUser$;

  constructor(private authFacade: AuthFacade, private router: Router, private userFacade: UsersFacade) {}

  ngOnInit(): void {
    this.userFacade.getCurrentUser();
  }

  handleLogOut(): void {
    this.authFacade.logOut();
    this.router.navigateByUrl('/account/login');
  }
}
