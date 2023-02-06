import { User } from '@project-assignment/shared/data-models-api';

export class Post {
  id: number;
  content: string;
  creator: User;
  storedFileName: string | undefined;
  createdAt: number;
}
