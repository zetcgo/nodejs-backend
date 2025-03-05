import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(user: User) {
        return await this.userRepository.save(user);
    }

    async getUser(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }

    async updateUser(email: string, user: User) {
        const previousUser = await this.getUser(email);
        return await this.userRepository.save({
            ...previousUser,
            username: user.username,
            password: user.password,
        });
    }

    async deleteUser(email: string) {
        return await this.userRepository.delete({ email });
    }
}
