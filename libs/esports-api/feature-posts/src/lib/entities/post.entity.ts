import { User } from '@project-assignment/esports-api/feature-users';

export class Post {
  id: number;
  content: string;
  creator: User;
  storedFileName: string | undefined;
  createdAt: number;
}
