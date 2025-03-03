import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type WeatherAPI = {
    current: Weather;
    hourly: Weather[];
    daily: Weather[];
};

export type Weather = {
    dt: Date;
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
};

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService) {}

    @Get()
    async getWeather() {
        const apiURL: string = this.configService.get('WEATHER_API_URL');
        const apiKey: string = this.configService.get('WEATHER_API_KEY');
        return (await fetch(`${apiURL}&appid=${apiKey}`).then((res) => res.json())) as WeatherAPI;
    }
}
