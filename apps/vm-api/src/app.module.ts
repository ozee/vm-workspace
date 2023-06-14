import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClsModule } from "nestjs-cls";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ListingModule } from "./listing/listing.module";
import { HashModule } from "./shared/hash.module";
import { UserEntity } from "./user/entities/user.entity";
import { ListingEntity } from "./listing/entities/listing.entity";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true }
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [UserEntity, ListingEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HashModule,
    UserModule,
    AuthModule,
    ListingModule,
  ],
})
export class AppModule {}
