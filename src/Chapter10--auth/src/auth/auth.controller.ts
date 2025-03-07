import { Controller, UseGuards, Body, Req, Res, Get, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard, LoginAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: UserDto) {
        return await this.authService.register(userDto);
    }

    // @Post('login')
    // async login(@Body() userDto: UserDto, @Res() res: Response) {
    //     const userInfo = await this.authService.validate(userDto);
    //     if (userInfo)
    //         res.cookie('login', JSON.stringify(userInfo), {
    //             httpOnly: true,
    //             maxAge: 1000 * 60 * 60 * 24,
    //         });
    //     return res.send({ message: 'Successfully logged in' });
    // }

    // @UseGuards(LoginGuard)
    // @Post('login')
    // login(@Req() req: RequestWithUser, @Res() res: Response) {
    //     if (!req.cookies?.login && req.user)
    //         res.cookie('login', req.user, {
    //             httpOnly: true,
    //             maxAge: 1000 * 60 * 60 * 24,
    //         });
    //     return res.send({ message: 'Successfully logged in' });
    // }

    @UseGuards(LoginAuthGuard)
    @Post('login')
    login(@Req() req: Request, @Res() res: Response) {
        return res.send({ message: 'Successfully logged in' });
    }

    // @UseGuards(LoginGuard)
    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    profile(@Req() req: Request) {
        return req.user;
    }
}
