import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { InMemoryDBEntityController, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ListingEntity } from './entities/listing.entity';
import { ClsService } from 'nestjs-cls';
import { AuthClsStore } from '../auth/auth-cls.store';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Controller('/listing')
@Auth()
export class ListingController extends InMemoryDBEntityController<ListingEntity> {
  constructor(
    private readonly listingService: InMemoryDBService<ListingEntity>,
    private readonly authClsStore: ClsService<AuthClsStore>
  ) {
    super(listingService);
  }

  @Post()
  create(@Body() body: CreateListingDto) {
    (body as ListingEntity).userId = this.authClsStore.get('user').id;
    return this.listingService.create(body);
  }

  @Get()
  findAll() {
    return this.listingService.getAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.listingService.get(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(updateListingDto as ListingEntity);
  }

  @Delete(':id/remove')
  remove(@Param('id') id: string) {
    return this.listingService.delete(id);
  }
}
