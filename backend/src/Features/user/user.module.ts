import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./users.schema";
import { UserService } from "./user.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService],
    exports: [UserService, AuthService],
})
export class UserModule {}
