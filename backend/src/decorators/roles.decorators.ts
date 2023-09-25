import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { UserType } from "../Features/user/enum";

export const Roles = (...roles: UserType[]) => SetMetadata("roles", roles);
