import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  @ApiHeader({
    name: 'Authorization',
    description: 'Token',
  })
  @UseGuards(AuthGuard)
  @Get(`/me`)
  me(@Request() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return request.user;
  }
}
