import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }

    serializeUser(userDto: UserDto, done: (err: Error, email: string) => void) {
        done(null, userDto.email);
    }

    async deserializeUser(email: string, done: (err: Error, userDto: UserDto) => void) {
        const user = await this.userService.getUser(email);
        if (user) done(null, { ...user, password: undefined });
        else done(new Error('Such user does not exist'), null);
    }
}
