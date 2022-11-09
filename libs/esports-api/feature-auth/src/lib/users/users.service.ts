import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from '../constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor() {
    [
      {
        username: 'john',
        password: '12345678',
      },
      {
        username: 'maria',
        password: '1234567890',
      },
    ].forEach(({ username, password }) =>
      this.create({
        username,
        password,
        repeatPassword: password,
      })
    );
  }

  async create(createsUserDto: CreateUserDto) {
    // https://docs.nestjs.com/exception-filters#custom-exceptions
    if (createsUserDto.password !== createsUserDto.repeatPassword) {
      throw new Error("Passwords don't match");
    }
    if (createsUserDto.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    const passwordHash = await bcrypt.hash(
      createsUserDto.password,
      bcryptConstants.saltRounds
    );

    this.users.push({
      id: this.users.length + 1,
      username: createsUserDto.username,
      password: passwordHash,
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
