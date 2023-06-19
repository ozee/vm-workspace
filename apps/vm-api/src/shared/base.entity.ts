import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface BaseEntity extends InMemoryDBEntity {
  createdAt?: Date;
  updatedAt?: Date;
}
