import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(userDto: CreateUserDto) {
        return await this.userRepository.save(userDto);
    }

    async getUser(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }

    async updateUser(email: string, userDto: UpdateUserDto) {
        const previousUser = await this.getUser(email);
        return await this.userRepository.save({ ...previousUser, ...userDto });
    }

    async deleteUser(email: string) {
        return await this.userRepository.delete({ email });
    }
}
