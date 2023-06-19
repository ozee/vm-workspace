import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forFeature('listing')],
  controllers: [ListingController],
  exports: [InMemoryDBModule.forFeature('listing')]
})
export class ListingModule {}
