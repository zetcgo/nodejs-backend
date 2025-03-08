import crypto from 'crypto';
import { diskStorage } from 'multer';
import path from 'path';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: path.join(__dirname, '..', 'uploads'),
                filename: (req, file, callback) =>
                    callback(null, crypto.randomUUID() + path.extname(file.originalname)),
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return `Successfully uploaded ${file.originalname} as http://localhost:3000/uploads/${file.filename}`;
    }
}
