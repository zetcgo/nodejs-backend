import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'users.sqlite',
            entities: [User],
            synchronize: true,
            logging: true,
        }),
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
