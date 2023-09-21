import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, ParseEnumPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "../dto/auth.dto";
import { log } from "../../../utils/debug.utils";

@Controller("v0/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    signup(@Body() body: SignupDto) {
        log("AuthController > signup > ", body);
        return this.authService.signup();
    }
}
