import { IsAlpha, IsNumberString, IsOptional, MaxLength } from "class-validator";

export class CreateListingDto {
  @MaxLength(250)
  listingName: string;

  @IsNumberString()
  listingFloorCount: string;

  @MaxLength(2000)
  @IsOptional()
  listingDescription: string;

  @MaxLength(250)
  address: string;

  @MaxLength(250)
  city: string;

  @IsAlpha()
  state: string;

  @IsNumberString()
  @MaxLength(5)
  zip: string;
}
