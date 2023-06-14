import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HashService } from "./hash.service";

@Module({
  imports: [ConfigModule],
  providers: [HashService],
  exports: [HashService],
})
@Global()
export class HashModule {}
