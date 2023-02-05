import { UserDetails } from '../auth/user.dto';
import { GenericId } from '../base.dto';

export interface ChatShortDetails {
  id: GenericId;
  title: string;
  profilePic: string;
}

export interface CreateChatDTO {
  user: UserDetails;
}

export interface ChatEntity extends ChatShortDetails {
  members: UserDetails[];
}
