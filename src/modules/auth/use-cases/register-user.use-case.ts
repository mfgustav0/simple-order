import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RegisterUser {
  constructor(private readonly userService: UsersService) {}

  async execute(input: Input): Promise<Output> {
    const userFound = await this.userService.findByEmail(input.email);
    if (userFound) {
      throw new UnprocessableEntityException('E-mail must be exists');
    }

    const createdUser = await this.userService.create(
      input.name,
      input.email,
      input.password,
    );

    return {
      name: createdUser.name,
      email: createdUser.email,
    };
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};

export class Output {
  name: string;
  email: string;
}
