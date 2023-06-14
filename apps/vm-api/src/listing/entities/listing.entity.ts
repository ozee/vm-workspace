import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { Nullable } from "../../shared/nullable.type";

@Entity('listings')
export class ListingEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 250 })
  listingName: string;

  @Column({ type: 'varchar', length: 2 })
  listingFloorCount: string;

  @Column({ type: 'text', nullable: true })
  listingDescription?: Nullable<string>;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 250 })
  city: string;

  @Column({ type: 'varchar', length: 250 })
  state: string;

  @Column({ type: 'varchar', length: 5 })
  zip: string;
}
