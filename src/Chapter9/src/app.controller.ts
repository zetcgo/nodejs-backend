import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get()
    greet(): string {
        return this.configService.get('GREETING');
    }
}
