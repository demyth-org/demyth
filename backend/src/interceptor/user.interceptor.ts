import { CallHandler, ExecutionContext, Inject, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class UserInterceptor implements NestInterceptor {
    constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const payload = await this.jwtService.decode(token);

        request["user"] = payload;
        return handler.handle();
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
