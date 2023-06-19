import { BaseEntity } from "../../shared/base.entity";

export interface UserEntity extends BaseEntity {
  email: string;
  password: string;
}
