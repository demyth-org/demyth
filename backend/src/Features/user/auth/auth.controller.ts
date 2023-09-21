import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, ParseEnumPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseUserDto, SignupDto } from "../dto/auth.dto";
import { log } from "../../../utils/debug.utils";

@Controller("v0/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    async signup(@Body() body: SignupDto): Promise<ResponseUserDto> {
        log("AuthController > signup > ", body);
        return await this.authService.signup(body);
    }
}
