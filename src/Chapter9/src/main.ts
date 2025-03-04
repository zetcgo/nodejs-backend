import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

void (async () => {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    await app.listen(configService.get('SERVER_PORT'), () =>
        console.log(`Server is running on http://localhost:${configService.get('SERVER_PORT')}`),
    );
})();
