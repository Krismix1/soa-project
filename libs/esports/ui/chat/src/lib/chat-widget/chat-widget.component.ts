import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatShortDetails, GetMessage } from '@project-assignment/shared/data-models-api';

@Component({
  selector: 'project-assignment-chat-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
})
export class ChatWidgetComponent {
  newMessage = true;
  collapsed = true;
  widgetState: 'COLLAPSED' | 'CHATS' | 'SELECTED_CHAT' = 'COLLAPSED';
  message = '';

  @Input() visibleChats: ChatShortDetails[] = [];
  @Input() messages: GetMessage[] = [];

  @Output() chatSelected = new EventEmitter<ChatShortDetails>();
  @Output() typing = new EventEmitter<string>();
  @Output() send = new EventEmitter<string>();
  @Output() chatClosed = new EventEmitter<void>();

  selectChat(chat: ChatShortDetails) {
    this.chatSelected.emit(chat);
    this.widgetState = 'SELECTED_CHAT';
  }

  messageChanged(text: string) {
    this.typing.emit(text);
    this.message = text;
  }

  sendMessage() {
    this.send.emit(this.message);
    this.message = '';
  }

  closeChat() {
    this.widgetState = 'COLLAPSED';
    this.chatClosed.emit();
  }

  trackByChatShortDetails(_index: number, chatInfo: ChatShortDetails) {
    return chatInfo.id;
  }

  trackByMessage(_index: number, message: GetMessage) {
    return message.id;
  }
}
