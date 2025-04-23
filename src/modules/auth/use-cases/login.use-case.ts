import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class Login {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userService.findByEmail(input.email);
    if (!user) {
      throw new UnprocessableEntityException('Credentials not found');
    }

    const passwordIsMatch = await this.userService.checkPasswordMatch(
      user,
      input.password,
    );
    if (!passwordIsMatch) {
      throw new UnprocessableEntityException('Credentials not found');
    }

    const token = await this.jwtService.signAsync({
      sub: user._id.toString(),
      name: user.name,
      email: user.email,
    });

    return {
      access_token: token,
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  access_token: string;
};
