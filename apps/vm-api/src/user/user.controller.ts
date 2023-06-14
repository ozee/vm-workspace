import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id/:listingId')
  findOneByUserIdAndId(@Param() data: any) {
    return this.userService.findListingByUserIdAndId(data.id, data.listingId);
  }
}
