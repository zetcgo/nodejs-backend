import { Controller, Body, Param, Delete, Get, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './blog.model';

@Controller()
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get()
    getArticles() {
        return this.blogService.getArticles();
    }

    @Post()
    createArticle(@Body() article: BlogDto) {
        return this.blogService.createArticle(article);
    }

    @Get('/:id')
    getArticle(@Param('id') id: string) {
        return this.blogService.getArticle(id);
    }

    @Put('/:id')
    updateArticle(@Param('id') id: string, @Body() article: BlogDto) {
        return this.blogService.updateArticle(id, article);
    }

    @Delete('/:id')
    deleteArticle(@Param('id') id: string) {
        return this.blogService.deleteArticle(id);
    }
}
