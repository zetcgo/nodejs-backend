import { Injectable } from '@nestjs/common';
import { BlogDto } from './blog.model';
import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
    constructor(private readonly blogRepository: BlogMongoRepository) {}

    async getArticles() {
        return await this.blogRepository.getArticles();
    }

    async createArticle(article: BlogDto) {
        await this.blogRepository.createArticle(article);
    }

    async getArticle(id: string) {
        return await this.blogRepository.getArticle(id);
    }

    async updateArticle(id: string, article: BlogDto) {
        await this.blogRepository.updateArticle(id, article);
    }

    async deleteArticle(id: string) {
        await this.blogRepository.deleteArticle(id);
    }
}
