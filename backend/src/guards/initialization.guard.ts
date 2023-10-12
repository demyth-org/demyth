// initialization.guard.ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InitDbService } from "../init/init.service";

@Injectable()
export class InitializationGuard implements CanActivate {
    constructor(private readonly initDbService: InitDbService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("InitializationGuard > canActivate");
        await this.initDbService.initializeSchemas();
        return true;
    }
}
