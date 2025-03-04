import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get()
    greet(): string {
        return this.configService.get('GREETING');
    }

    @Get('server-info')
    getServerInfo(): string {
        return this.configService.get('SERVER_URL');
    }

    @Get('db-info')
    getDBInfo(): string {
        console.log(this.configService.get('logLevel'));
        console.log(this.configService.get('apiVersion'));
        return this.configService.get('dbInfo');
    }

    @Get('redis-info')
    getRedisInfo(): string {
        return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
    }
}
