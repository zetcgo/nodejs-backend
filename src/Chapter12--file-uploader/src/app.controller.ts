import crypto from 'crypto';
import { diskStorage } from 'multer';
import path from 'path';
import { Controller, Post, UseInterceptors } from '@nestjs/common';
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
    uploadFile() {
        return 'Successfully uploaded file';
    }
}
