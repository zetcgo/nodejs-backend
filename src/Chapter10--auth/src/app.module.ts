import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.cwd()}/.env`,
            cache: true,
            expandVariables: true,
        }),
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
