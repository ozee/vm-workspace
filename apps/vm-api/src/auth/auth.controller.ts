import { Body, Controller, Get, Post } from "@nestjs/common";
import { Auth } from "./auth.decorator";
import { AuthService } from "./auth.service";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { AuthSignUpDto } from "./dto/auth-sign-up.dto";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { UserEntity } from "../user/entities/user.entity";

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() body: AuthSignUpDto): Promise<UserEntity> {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  signIn(@Body() body: AuthSignInDto): Promise<AuthTokenDto> {
    return this.authService.signIn(body);
  }

  @Get('/user')
  @Auth()
  getUser(): Promise<UserEntity> {
    return this.authService.getUser();
  }
}
