import { BaseEntity } from "../../shared/base.entity";
import { Nullable } from "../../shared/nullable.type";

export interface ListingEntity extends BaseEntity {
  userId?: string;
  listingName?: string;
  listingFloorCount?: string;
  listingDescription?: Nullable<string>;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}
