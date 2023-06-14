export interface Room {
  id: number;
  name: string;
  floor: number;
  description?: string;
}

export interface Listing {
  id: string;
  userId: string;

  listingName: string;
  listingFloorCount: number;
  listingDescription?: string;

  address: string;
  city: string;
  state: string;
  zip: string;

}
