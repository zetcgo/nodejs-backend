import path from 'path';
import dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';

dotenv.config({ path: path.join(__dirname, '../.env') });

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/blog`,
        ),
        MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}
