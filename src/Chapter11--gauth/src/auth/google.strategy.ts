import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const email = profile.emails[0].value;
        const username = `${profile.name.familyName}${profile.name.givenName}`;
        return (
            (await this.userService.getUser(profile.emails[0].value)) ||
            (await this.userService.createUser({ email, username, providerId: profile.id }))
        );
    }
}
