import { Module } from '@nestjs/common';
import { ChatGateway, RoomGateway } from './app.gateway';

@Module({ providers: [ChatGateway, RoomGateway] })
export class AppModule {}
