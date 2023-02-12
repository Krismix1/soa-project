import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  ConnectionsFacade,
  EsportsConnectionsDataAccessModule,
} from '@project-assignment/esports/connections/data-access';
import { EsportsUiUserProfileComponent } from '@project-assignment/esports/ui/user-profile';
import { EsportsUsersDataAccessModule, UsersFacade } from '@project-assignment/esports/users/data-access';
import { UserDetails } from '@project-assignment/shared/data-models-api';
import { GravatarModule } from 'ngx-gravatar';
import { filter, Observable, Subject, Subscription, withLatestFrom } from 'rxjs';

@Component({
  selector: 'project-assignment-esports-users-feature',
  standalone: true,
  imports: [
    CommonModule,
    EsportsUsersDataAccessModule,
    EsportsUiUserProfileComponent,
    RouterModule,
    EsportsConnectionsDataAccessModule,
    GravatarModule,
  ],
  templateUrl: './esports-users-feature.component.html',
  styleUrls: ['./esports-users-feature.component.scss'],
})
export class EsportsUsersFeatureComponent implements OnInit, OnDestroy {
  selectedUser$ = this.usersFacade.selectedUser$;
  currentUser$ = this.usersFacade.currentUser$;
  selectIsSelectedUserTheLoggedInUser$ = this.usersFacade.selectIsSelectedUserTheLoggedInUser$;

  selectIsCurrentUserFriendWithSelectedUser$ = this.usersFacade.selectIsCurrentUserFriendWithSelectedUser$;
  selectHasCurrentUserOutgoingPendingConnectionWithSelectedUser$ =
    this.usersFacade.selectHasCurrentUserOutgoingPendingConnectionWithSelectedUser$;

  selectHasCurrentUserIncomingPendingConnectionWithSelectedUser$ =
    this.usersFacade.selectHasCurrentUserIncomingPendingConnectionWithSelectedUser$;

  currentUserConnections$ = this.usersFacade.selectCurrentUserConnections$;

  subscriptions: Subscription[] = [];

  deleteFriendEmitter = new Subject<UserDetails>();
  deletePendingRequestEmitter = new Subject<UserDetails>();
  sendFriendRequestEmitter = new Subject<UserDetails>();
  acceptFriendRequestEmitter = new Subject<UserDetails>();

  constructor(
    private route: ActivatedRoute,
    private usersFacade: UsersFacade,
    private connectionsFacade: ConnectionsFacade,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const id = +params['id'];
        this.usersFacade.getUserDetails(id);
        this.connectionsFacade.init(id.toString());
      }),
      this.currentUser$.subscribe((user) => {
        if (user) {
          this.connectionsFacade.init(user.id.toString());
        }
      }),
      this.deleteFriendEmitter
        .pipe(
          withLatestFrom(
            this.currentUser$.pipe(filter((user) => !!user)) as Observable<UserDetails>,
            this.currentUserConnections$,
          ),
        )
        .subscribe(([selectedUser, user, connections]) => {
          const connection = connections?.find((conn) => ('to' in conn ? conn.to : conn.from).id === selectedUser.id);
          connection && this.connectionsFacade.deleteFriend(connection, user);
        }),

      this.deletePendingRequestEmitter
        .pipe(
          withLatestFrom(
            this.currentUser$.pipe(filter((user) => !!user)) as Observable<UserDetails>,
            this.currentUserConnections$,
          ),
        )
        .subscribe(([selectedUser, user, connections]) => {
          const connection = connections?.find((conn) => ('to' in conn ? conn.to : conn.from).id === selectedUser.id);
          connection && this.connectionsFacade.deleteFriend(connection, user);
        }),

      this.sendFriendRequestEmitter
        .pipe(withLatestFrom(this.currentUser$.pipe(filter((user) => !!user)) as Observable<UserDetails>))
        .subscribe(([selectedUser, user]) => {
          this.connectionsFacade.sendFriendRequest(selectedUser, user);
        }),

      this.acceptFriendRequestEmitter
        .pipe(
          withLatestFrom(
            this.currentUser$.pipe(filter((user) => !!user)) as Observable<UserDetails>,
            this.currentUserConnections$,
          ),
        )
        .subscribe(([selectedUser, user, connections]) => {
          const connection = connections?.find((conn) => ('to' in conn ? conn.to : conn.from).id === selectedUser.id);
          connection && this.connectionsFacade.acceptFriendRequest(connection, user);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  deleteFriend(selectedUser: UserDetails) {
    this.deleteFriendEmitter.next(selectedUser);
  }

  deletePendingConnection(selectedUser: UserDetails) {
    this.deletePendingRequestEmitter.next(selectedUser);
  }

  sendFriendRequest(selectedUser: UserDetails) {
    this.sendFriendRequestEmitter.next(selectedUser);
  }

  acceptPendingConnection(selectedUser: UserDetails) {
    this.acceptFriendRequestEmitter.next(selectedUser);
  }
}
