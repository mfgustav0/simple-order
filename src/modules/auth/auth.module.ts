import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Login } from './use-cases/login.use-case';
import { UsersModule } from '../users/users.module';
import { RegisterUser } from './use-cases/register-user.use-case';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [Login, RegisterUser, AuthService],
})
export class AuthModule {}
