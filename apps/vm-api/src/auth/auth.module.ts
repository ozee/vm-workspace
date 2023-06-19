import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [UserModule, ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        global: true,
        signOptions: {
          expiresIn: configService.get('AUTH_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
