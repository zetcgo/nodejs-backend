import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                `${process.cwd()}/src/envs/.env.${process.env.NODE_ENV}.local`,
                `${process.cwd()}/src/envs/.env.local`,
                `${process.cwd()}/src/envs/.env`,
            ],
            load: [config],
            cache: true,
            expandVariables: true,
        }),
        WeatherModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
