import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { Login } from './use-cases/login.use-case';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUser } from './use-cases/register-user.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly login: Login,
    private readonly registerUser: RegisterUser,
  ) {}

  async doLogin(loginDto: LoginDto): Promise<AuthTokenDto> {
    const output = await this.login.execute(loginDto);

    return new AuthTokenDto(output.access_token);
  }

  async register(registerUserDto: RegisterUserDto): Promise<AuthTokenDto> {
    const outputRegister = await this.registerUser.execute(registerUserDto);

    const output = await this.login.execute({
      email: outputRegister.email,
      password: registerUserDto.password,
    });

    return new AuthTokenDto(output.access_token);
  }
}
