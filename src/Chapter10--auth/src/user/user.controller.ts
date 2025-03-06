import { Controller, Body, Param, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() userDto: CreateUserDto) {
        return await this.userService.createUser(userDto);
    }

    @Get(':email')
    async getUser(@Param('email') email: string) {
        return await this.userService.getUser(email);
    }

    @Put(':email')
    async updateUser(@Param('email') email: string, @Body() userDto: UpdateUserDto) {
        return await this.userService.updateUser(email, userDto);
    }

    @Delete(':email')
    async deleteUser(@Param('email') email: string) {
        return await this.userService.deleteUser(email);
    }
}
