import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '../user/user.module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [SessionSerializer, GoogleStrategy],
})
export class AuthModule {}
