import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, UserDetails } from '@project-assignment/shared/data-models-api';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class EsportsApiFeatureUsersService implements OnModuleInit {
  private readonly users: User[] = [];

  async onModuleInit() {
    const users = [
      {
        id: 1,
        username: 'john',
        password: '12345678',
      },
      {
        id: 2,
        username: 'maria',
        password: '1234567890',
      },
    ];
    for (const { username, password } of users) {
      await this.create(
        {
          username,
          password,
          repeatPassword: password,
        },
        10,
      );
    }
  }

  async create(createsUserDto: CreateUserDto, saltRounds: number) {
    // https://docs.nestjs.com/exception-filters#custom-exceptions
    if (createsUserDto.password !== createsUserDto.repeatPassword) {
      throw new Error("Passwords don't match");
    }
    if (createsUserDto.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    const passwordHash = await bcrypt.hash(createsUserDto.password, saltRounds);

    this.users.push({
      id: this.users.length + 1,
      username: createsUserDto.username,
      password: passwordHash,
    });
  }

  findOneByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  findOneById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

@Injectable()
export class UserToDTOMapper {
  mapOne(user: User): UserDetails {
    const { password: _, ...details } = user;
    return details;
  }

  mapMany(users: User[]): UserDetails[] {
    return users.map((user) => this.mapOne(user));
  }
}