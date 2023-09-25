import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserService } from "../Features/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1) Determine userTypes that can execute the endpoint
        // 2) Grab the JWT Token from the request header and verify it
        // 3) Get the user id in db
        // 4) Determine if the user has permission
        const roles = this.reflector.getAllAndOverride("roles", [context.getHandler(), context.getClass()]);
        if (roles?.length) {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException("JWT empty.");
            }
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: process.env.JSON_TOKEN_KEY,
                });
                // 💡 We're assigning the payload to the request object here
                // so that we can access it in our route handlers
                console.log("canActivate : " + { payload });

                request.user = payload;
            } catch {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findOneById(request.user.sub);
            if (user && roles.includes(user.userType)) return true;
            return false;
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
