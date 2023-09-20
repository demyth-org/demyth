import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MythologyController } from "./mythology.controller";
import { Mythology, MythologySchema } from "./mythologies.schema";
import { MythologyService } from "./mythology.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MythologyDbService } from "./mythology.db.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Mythology.name, schema: MythologySchema }])],
    controllers: [MythologyController],
    providers: [
        MythologyService,
        MythologyDbService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
    exports: [MythologyService, MythologyDbService],
})
export class MythologyModule {}
