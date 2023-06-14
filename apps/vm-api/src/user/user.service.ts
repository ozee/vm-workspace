import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Nullable } from '../shared/nullable.type';
import { HashService } from '../shared/hash.service';
import { ListingEntity } from '../listing/entities/listing.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ListingEntity)
    private listingRepository: Repository<ListingEntity>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity>{
    const { password, ...userData } = createUserDto;
    const passwordHash = await this.hashService.createHash(password);
    const userEntity = this.userRepository.create({
      ...userData,
      passwordHash,
    });

    return this.userRepository.save(userEntity);
  }

  findOneById(id: string): Promise<Nullable<UserEntity>> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<Nullable<UserEntity>> {
    return this.userRepository.findOneBy({ email });
  }

  findListingByUserIdAndId(userId: string, id: string): Promise<Nullable<ListingEntity>> {
    return this.listingRepository.findOneBy({
      id,
      userId,
    });
  }
}
