import path from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

void (async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(path.join(__dirname, '..', 'static'));
    await app.listen(3000, () => 'Server is running on http://localhost:3000');
})();
