import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, ParseEnumPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./users.schema";
import { log } from "../../utils/debug.utils";
import { UserType } from "./enum";
import { ParseObjectIdPipe } from "../../pipe/objectid.pipe";

@Controller("v0/users")
export class UserController {
    constructor(private readonly userService: UserService) {}
}
