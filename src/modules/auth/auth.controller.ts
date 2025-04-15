import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserResponse } from './dtos/user-response.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: AuthTokenDto,
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<AuthTokenDto> {
    return await this.authService.doLogin(loginDto);
  }

  @ApiCreatedResponse({
    type: UserResponse,
  })
  @HttpCode(201)
  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    return await this.authService.register(registerUserDto);
  }
}
