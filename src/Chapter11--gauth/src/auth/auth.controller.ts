import { Controller, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, GoogleAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(GoogleAuthGuard)
    @Get('login')
    login() {}

    // @UseGuards(LoginGuard)
    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    profile(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    googleAuthRedirect(@Req() req: Request) {
        return req.user;
    }
}
