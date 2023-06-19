import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { InMemoryDBEntityController, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ListingEntity } from '../listing/entities/listing.entity';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UserController extends InMemoryDBEntityController<UserEntity> {
  constructor(
    private readonly userService: InMemoryDBService<UserEntity>,
    private readonly listingService: InMemoryDBService<ListingEntity>) {
    super(userService);
  }

  @Post()
  create(@Param() body: CreateUserDto): UserEntity {
    return this.userService.create(body);
  }

  @Get('/:id/:listingId')
  findOneByUserIdAndId(@Param('id') id: string, @Param('listingId') listingId: string): ListingEntity {
    return this.listingService.query((data: ListingEntity) => id === data.userId && listingId === data.id)[0];
  }
}
