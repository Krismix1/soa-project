import { UserDetails } from '../auth/user.dto';
import { GenericId } from '../base.dto';

export interface BaseMessage {
  content: string;
  from: UserDetails;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SendMessage extends BaseMessage {}

export interface GetMessage extends BaseMessage {
  id: GenericId;
}

export interface SendMessageToChat {
  chatId: GenericId;
  message: SendMessage;
}

export interface GetMessageFromChat {
  chatId: GenericId;
  message: GetMessage;
}
