import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./users.schema";
import { UserService } from "./user.service";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
    exports: [UserService],
})
export class UserModule {}
