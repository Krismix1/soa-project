import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, LoginResponse, User } from '@project-assignment/shared/data-models-api';
import { Observable } from 'rxjs';

@Injectable()
export class AuthServiceProxy {
  constructor(@Inject('AUTH_SERVICE') private readonly authClientProxy: ClientProxy) {}

  validateUser(username: string, pass: string): Observable<Omit<User, 'password'>> {
    const pattern = { cmd: 'validate_user' };
    const payload = { username, password: pass };
    return this.authClientProxy.send<Omit<User, 'password'>>(pattern, payload);
  }

  login(user: User): Observable<LoginResponse> {
    const pattern = { cmd: 'login' };
    const payload = { user };
    return this.authClientProxy.send<LoginResponse>(pattern, payload);
  }

  register(createUser: CreateUserDto) {
    const pattern = { cmd: 'register' };
    const payload = { createUser };
    return this.authClientProxy.send<void>(pattern, payload);
  }
}
