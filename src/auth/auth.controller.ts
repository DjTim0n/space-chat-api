import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { User } from "./schemas/user.schema";
import { AuthUserDto } from "./dto/user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("registration")
  async registrationUser(@Body() user: AuthUserDto) {
    await this.authService.registerUser(user);
    return {
      message: "User has been registered successfully",
      statusCode: 201,
    };
  }

  @Post("login")
  async loginUser(@Body() user: AuthUserDto) {
    const token = await this.authService.loginUser(user);
    return {
      message: "User has been logged in successfully",
      token,
      statusCode: 201,
    };
  }
}
