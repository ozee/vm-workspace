import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { AuthClsStore } from "./auth-cls.store";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { AuthSignUpDto } from "./dto/auth-sign-up.dto";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { AuthTokenPayload } from "./dto/auth-token.payload";
import { HashService } from "../shared/hash.service";
import { UserEntity } from "../user/entities/user.entity";
import { InMemoryDBService, InjectInMemoryDBService } from "@nestjs-addons/in-memory-db";

@Injectable()
export class AuthService {
  constructor(
    @InjectInMemoryDBService('user')
    private userService: InMemoryDBService<UserEntity>,
    private hashService: HashService,
    private jwtService: JwtService,
    private authClsStore: ClsService<AuthClsStore>
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<UserEntity> {
    authSignUpDto.password = await this.hashService.createHash(authSignUpDto.password);
    return this.userService.create(authSignUpDto);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthTokenDto> {
    const { email, password } = authSignInDto;
    const user: UserEntity = this.userService.query((data: UserEntity) => data.email === email)[0];
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!this.hashService.compareHash(password, user.password)) {
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
