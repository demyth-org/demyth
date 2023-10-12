import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../Features/user/user.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JSON_TOKEN_KEY,
            signOptions: { expiresIn: process.env.JSON_TOKEN_EXPIRE },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
