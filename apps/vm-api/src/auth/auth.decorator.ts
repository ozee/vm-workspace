import { SetMetadata, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

export const AUTH_KEY = Symbol('AUTH');

export function Auth() {
  return applyDecorators(SetMetadata(AUTH_KEY, true), ApiBearerAuth());
}
