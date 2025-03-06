import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

void (async () => {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.use(
        session({
            secret: configService.get('SESSION_KEY'),
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 * 60 * 24 },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
})();
