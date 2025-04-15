import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
