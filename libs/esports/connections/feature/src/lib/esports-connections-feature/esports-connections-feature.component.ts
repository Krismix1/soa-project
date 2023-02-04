import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LetModule } from '@ngrx/component';
import {
  ConnectionsFacade,
  EsportsConnectionsDataAccessModule,
} from '@project-assignment/esports/connections/data-access';
import { EsportsUiUserProfileComponent } from '@project-assignment/esports/ui/user-profile';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'project-assignment-esports-connections-feature',
  standalone: true,
  imports: [CommonModule, EsportsConnectionsDataAccessModule, EsportsUiUserProfileComponent, LetModule],
  templateUrl: './esports-connections-feature.component.html',
  styleUrls: ['./esports-connections-feature.component.scss'],
})
export class EsportsConnectionsFeatureComponent implements OnInit, OnDestroy {
  friendConnections$ = this.connectionsFacade.friendConnections$;
  outgoingConnections$ = this.connectionsFacade.outgoingPendingConnections$;
  incomingConnections$ = this.connectionsFacade.incomingPendingConnections$;

  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private connectionsFacade: ConnectionsFacade, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const id = this.route.parent!.snapshot.params['id'];
        this.connectionsFacade.init(id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  selectUser(user: UserDetails): void {
    this.router.navigate(['/users', user.id]);
  }
}
