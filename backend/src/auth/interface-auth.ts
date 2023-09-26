import { Types } from "mongoose";
import { UserType } from "../Features/user/enum";

export interface JWTPayload {
    sub: string;
    email: string;
    role: UserType;
}
