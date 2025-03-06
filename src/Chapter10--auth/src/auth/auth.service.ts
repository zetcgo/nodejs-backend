import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {
        if (await this.userService.getUser(userDto.email))
            throw new HttpException('Such user already exists', HttpStatus.BAD_REQUEST);
        try {
            const user = await this.userService.createUser({
                ...userDto,
                password: bcrypt.hashSync(userDto.password, 10),
            });
            return { ...user, password: undefined };
        } catch {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validate(userDto: LoginUserDto) {
        const user = await this.userService.getUser(userDto.email);
        if (user && bcrypt.compareSync(userDto.password, user.password))
            return { ...user, password: undefined };
        return null;
    }
}
