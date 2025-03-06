import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/user.dto';

export type RequestWithUser = Request & { user?: LoginUserDto };

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<RequestWithUser>();
        if (req.cookies?.login) return !!(req.user = req.cookies.login as LoginUserDto);
        const user = await this.authService.validate(req.body as LoginUserDto);
        return user && !!(req.user = user);
    }
}
