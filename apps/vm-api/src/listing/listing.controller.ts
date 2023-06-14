import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Auth } from '../auth/auth.decorator';

@Controller('/listing')
@Auth()
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Post()
  create(@Body() body: CreateListingDto) {
    return this.listingService.create(body);
  }

  @Get()
  findAll() {
    return this.listingService.findAll();
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.listingService.findOneById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(id, updateListingDto);
  }

  @Delete(':id/remove')
  remove(@Param('id') id: string) {
    return this.listingService.remove(id);
  }
}
