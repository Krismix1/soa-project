import { UserDetails } from '../auth/user.dto';

export class GetPostDto {
  constructor(
    public id: number | string,
    public content: string,
    public link: string | undefined,
    public creator: UserDetails,
    public createdAt: number,
  ) {}
}
