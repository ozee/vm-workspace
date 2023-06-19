import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClsModule } from "nestjs-cls";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ListingModule } from "./listing/listing.module";
import { HashModule } from "./shared/hash.module";
import { InMemoryDBModule } from "@nestjs-addons/in-memory-db";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true }
    }),
    InMemoryDBModule.forRoot(),
    ConfigModule.forRoot(),
    HashModule,
    UserModule,
    AuthModule,
    ListingModule,
  ],
})
export class AppModule {}
