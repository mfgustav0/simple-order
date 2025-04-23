import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard, UserToken } from '../auth/auth.guard';
import { ApiHeader } from '@nestjs/swagger';
import { Request as RequestExpress } from 'express';

@Controller('user')
export class UsersController {
  @ApiHeader({
    name: 'Authorization',
    description: 'Token',
  })
  @UseGuards(AuthGuard)
  @Get(`/me`)
  me(@Request() request: RequestExpress & { user: UserToken }) {
    return request.user;
  }
}
