import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), WeatherModule],
    controllers: [AppController],
})
export class AppModule {}
