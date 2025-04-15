import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty()
  readonly access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
