import { Controller, Body, Param, Delete, Get, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() user: User) {
        return await this.userService.createUser(user);
    }

    @Get(':email')
    async getUser(@Param('email') email: string) {
        return await this.userService.getUser(email);
    }

    @Put(':email')
    async updateUser(@Param('email') email: string, @Body() user: User) {
        return await this.userService.updateUser(email, user);
    }

    @Delete(':email')
    async deleteUser(@Param('email') email: string) {
        return await this.userService.deleteUser(email);
    }
}
