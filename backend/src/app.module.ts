import { ClassSerializerInterceptor, Module, OnModuleInit, ServiceUnavailableException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HeroModule } from "./Features/hero/hero.module";
import { MythologyModule } from "./Features/mythology/mythology.module";
import { GodModule } from "./Features/god/god.module";
import { InitModule } from "./init/init.module";
import { InitDbService } from "./init/init.service";
import { log } from "./utils/debug.utils";
import { UserModule } from "./Features/user/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { UserInterceptor } from "./interceptor/user.interceptor";
import { AuthGuard } from "./guards/auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        AuthModule,
        UserModule,
        HeroModule,
        MythologyModule,
        GodModule,
        InitModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: UserInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly initDbService: InitDbService) {}
    async onModuleInit() {
        log("MythologyModule > onModuleInit");
        if (!(await this.initDbService.initializeSchemas())) {
            throw new ServiceUnavailableException();
        }
    }
}
