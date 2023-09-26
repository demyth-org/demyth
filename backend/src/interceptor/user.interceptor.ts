import { CallHandler, ExecutionContext, Inject, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTPayload } from "../auth/interface-auth";

export class UserInterceptor implements NestInterceptor {
    constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const payload = (await this.jwtService.decode(token)) as JWTPayload;

        request.user = payload;
        return handler.handle();
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }

    // TODO Test this
    private extractTokenFromHeader2(request: Request): string | undefined {
        const [type, token] = request.headers.get("authorization").split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
