import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { UserType } from "../Features/user/enum";

export const UserTypes = (...userTypes: UserType[]) => SetMetadata("userTypes", userTypes);
