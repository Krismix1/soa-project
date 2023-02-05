import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { AuthFacade } from '@project-assignment/esports/auth/data-access';
import {
  ChatMessagesFacade,
  EsportsChatMessagesDataAccessModule,
} from '@project-assignment/esports/chat-messages/data-access';
import { ChatWidgetComponent } from '@project-assignment/esports/ui/chat';
import { EsportsUsersDataAccessModule, UsersFacade } from '@project-assignment/esports/users/data-access';
import { ChatShortDetails, UserDetails } from '@project-assignment/shared/data-models-api';
import { filter, map, Observable, shareReplay, Subject, Subscription, withLatestFrom } from 'rxjs';
import { FeedComponent } from '../feed/feed.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'project-assignment-esports-home-feature',
  standalone: true,
  imports: [
    CommonModule,
    EsportsUsersDataAccessModule,
    HeaderComponent,
    FeedComponent,
    LetModule,
    RouterModule,
    ChatWidgetComponent,
    EsportsChatMessagesDataAccessModule,
  ],
  templateUrl: './esports-home-feature.component.html',
  styleUrls: ['./esports-home-feature.component.scss'],
})
export class EsportsHomeFeatureComponent implements OnInit, OnDestroy {
  currentUser$ = this.userFacade.currentUser$;
  chatMessages$ = this.chatMessageFacade.selectedChatMessages$;
  chats$ = this.chatMessageFacade.allChats$;
  selectedChat$ = this.chatMessageFacade.selectedChat$;

  sendMessageEmitter = new Subject<string>();

  private subscriptions: Subscription[] = [];

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private userFacade: UsersFacade,
    private chatMessageFacade: ChatMessagesFacade,
  ) {}

  ngOnInit(): void {
    this.userFacade.getCurrentUser();
    this.chatMessageFacade.initChats();

    const validCurrentUser$ = this.currentUser$.pipe(
      filter((u) => !!u),
      map((u) => u as UserDetails),
      shareReplay(1),
    );
    const validSelectedChat$ = this.selectedChat$.pipe(
      filter((v) => !!v),
      map((v) => v as ChatShortDetails),
      shareReplay(1),
    );

    this.subscriptions.push(
      this.sendMessageEmitter
        .pipe(withLatestFrom(validCurrentUser$, validSelectedChat$))
        .subscribe(([message, currentUser, chat]) => {
          this.chatMessageFacade.sendMessage({ chatId: chat.id, message: { content: message, from: currentUser } });
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  handleLogOut(): void {
    this.authFacade.logOut();
    this.router.navigateByUrl('/account/login');
  }

  sendMessage(message: string) {
    this.sendMessageEmitter.next(message);
  }

  onSelectChat(chat: ChatShortDetails) {
    this.chatMessageFacade.loadChatMessages(chat);
  }

  onChatClosed() {
    this.chatMessageFacade.closeSelectedChat();
  }
}
