import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto/auth.dto";

// TODO: handle other signUp signIn possibility: passport, evm address...
@Controller("v0/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    async signUp(@Body() signUpDto: SignUpDto): Promise<string> {
        return await this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/signin")
    async signIn(@Body() signInDto: SignInDto): Promise<string> {
        return await this.authService.signIn(signInDto);
    }
}
