import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  checkPasswordMatch(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const passwordHashed = await bcrypt.hash(password, 10);
    const createUserDto = new CreateUserDto(name, email, passwordHashed);

    return await this.userRepository.create(createUserDto);
  }
}
