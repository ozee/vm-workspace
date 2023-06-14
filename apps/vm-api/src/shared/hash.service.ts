import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcrypt";

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  async createHash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(this.configService.get('SALT_ROUNDS'), 10));

    return await bcrypt.hash(value, salt);
  }

  async compareHash(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
