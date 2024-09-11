import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
  @ApiProperty({ example: "user", description: "User name" })
  username: string;
  @ApiProperty({ example: "password", description: "User password" })
  password: string;
}
