import { Injectable } from '@nestjs/common';
import { Article } from './blog.model';
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
    constructor(private readonly blogRepository: BlogFileRepository) {}

    async getArticles() {
        return await this.blogRepository.getArticles();
    }

    async createArticle(article: Article) {
        await this.blogRepository.createArticle(article);
    }

    async getArticle(id: string) {
        return await this.blogRepository.getArticle(id);
    }

    async updateArticle(id: string, article: Article) {
        await this.blogRepository.updateArticle(id, article);
    }

    async deleteArticle(id: string) {
        await this.blogRepository.deleteArticle(id);
    }
}
