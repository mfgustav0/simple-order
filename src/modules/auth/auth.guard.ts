import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.getTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user: UserTokenResponse = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_TOKEN'),
      });

      request['user'] = {
        id: user.sub,
        name: user.name,
        email: user.email,
      } as UserToken;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private getTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}

type UserTokenResponse = {
  sub: string;
  name: string;
  email: string;
};

type UserToken = {
  id: string;
  name: string;
  email: string;
};
