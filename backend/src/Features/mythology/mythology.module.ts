import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MythologyController } from "./mythology.controller";
import { Mythology, MythologySchema } from "./mythologies.schema";
import { MythologyService } from "./mythology.service";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [MongooseModule.forFeature([{ name: Mythology.name, schema: MythologySchema }])],
    controllers: [MythologyController],
    providers: [
        MythologyService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
    exports: [MythologyService],
})
export class MythologyModule {}
