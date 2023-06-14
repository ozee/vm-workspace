import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { AUTH_KEY } from './auth.decorator';
import { UserService } from '../user/user.service';
import { AuthClsStore } from './auth-cls.store';
import { AuthTokenPayload } from './dto/auth-token.payload';

type RequestWithAuth = Request & { headers: { authorization: string } };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private authClsStore: ClsService<AuthClsStore>,
    private reflector: Reflector
  ) {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuth = this.reflector.getAllAndOverride<boolean>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAuth) {
      return true;
    }

    const token = this.getTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: AuthTokenPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('AUTH_SECRET'),
      });
      const user = await this.userService.findOneById(payload.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      this.authClsStore.set('user', user);
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private getTokenFromHeader(request: RequestWithAuth): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
