import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User, UserDetails } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

@Injectable()
export class UsersServiceProxy {
  constructor(@Inject('USERS_SERVICE') private readonly usersClientProxy: ClientProxy) {}

  // create(createsUserDto: CreateUserDto, saltRounds: number): Observable<User> {
  //   const pattern = { cmd: 'create_user' };
  //   const payload = {
  //     createsUserDto,
  //     saltRounds,
  //   };
  //   return this.usersClientProxy.send<User>(pattern, payload);
  // }

  findOneByUsername(username: string): Observable<User | undefined> {
    const pattern = { cmd: 'find_user_by_username' };
    const payload = {
      username,
    };
    return this.usersClientProxy.send<User | undefined>(pattern, payload);
  }

  findOneById(id: number): Observable<User | undefined> {
    const pattern = { cmd: 'find_user_by_id' };
    const payload = {
      id,
    };
    return this.usersClientProxy.send<User | undefined>(pattern, payload);
  }

  mapOne(user: User): Observable<UserDetails> {
    const pattern = { cmd: 'map_one_user' };
    const payload = {
      user,
    };
    return this.usersClientProxy.send<UserDetails>(pattern, payload);
  }
}
