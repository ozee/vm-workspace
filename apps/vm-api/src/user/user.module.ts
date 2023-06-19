import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ListingModule } from '../listing/listing.module';

@Module({
  imports: [
    ListingModule,
    InMemoryDBModule.forFeature('user'),
  ],
  controllers: [UserController],
  exports: [InMemoryDBModule.forFeature('user')]
})
export class UserModule {}
