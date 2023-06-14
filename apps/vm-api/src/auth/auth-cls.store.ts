import { ClsStore } from "nestjs-cls";
import { UserEntity } from "../user/entities/user.entity";

export interface AuthClsStore extends ClsStore {
  user: UserEntity;
}
