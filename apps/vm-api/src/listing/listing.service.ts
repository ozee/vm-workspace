import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { AuthClsStore } from '../auth/auth-cls.store';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingEntity } from './entities/listing.entity';
import { Nullable } from '../shared/nullable.type';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(ListingEntity)
    private listingRepository: Repository<ListingEntity>,
    private authClsStore: ClsService<AuthClsStore>,
  ) {}

  create(createListingDto: CreateListingDto) {
    const entity = this.listingRepository.create({
      ...createListingDto,
      userId: this.authClsStore.get('user.id'),
    });

    return this.listingRepository.save(entity);
  }

  findAll(): Promise<ListingEntity[]> {
    return this.listingRepository.find({
      where: { userId: this.authClsStore.get('user.id') },
    })
  }

  findOneById(id: string): Promise<Nullable<ListingEntity>> {
    return this.listingRepository.findOneBy({
      id,
      userId: this.authClsStore.get('user.id')
    });
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    return this.listingRepository.update({
      id,
      userId: this.authClsStore.get('user.id'),
    }, {
      ...updateListingDto,
    });
  }

  remove(id: string) {
    this.listingRepository.delete({
      id,
      userId: this.authClsStore.get('user.id'),
    });
  }
}
