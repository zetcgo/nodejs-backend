import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

void (async () => {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, () => 'Server is running on http://localhost:3000');
})();
