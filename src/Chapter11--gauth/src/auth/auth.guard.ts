import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export type RequestWithAuth = Request & { isAuthenticated: () => boolean };

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = !!(await super.canActivate(context));
        await super.logIn(context.switchToHttp().getRequest());
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        return context.switchToHttp().getRequest<RequestWithAuth>().isAuthenticated();
    }
}
