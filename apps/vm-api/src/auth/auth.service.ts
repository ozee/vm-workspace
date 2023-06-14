import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { UserService } from "../user/user.service";
import { AuthClsStore } from "./auth-cls.store";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { AuthSignUpDto } from "./dto/auth-sign-up.dto";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { AuthTokenPayload } from "./dto/auth-token.payload";
import { HashService } from "../shared/hash.service";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
    private authClsStore: ClsService<AuthClsStore>
  ) {}

  signUp(authSignUpDto: AuthSignUpDto): Promise<UserEntity> {
    return this.userService.create(authSignUpDto);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthTokenDto> {
    const { email, password } = authSignInDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!this.hashService.compareHash(password, user.passwordHash)) {
      throw new UnauthorizedException();
    }

    const authTokenPayload: AuthTokenPayload = { id: user.id };
    const token = await this.jwtService.signAsync(authTokenPayload);

    return { token };
  }

  async getUser(): Promise<UserEntity> {
    return this.authClsStore.get('user');
  }
}
