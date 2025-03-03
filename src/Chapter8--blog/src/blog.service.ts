import { Article } from './blog.model';
import { BlogRepository, BlogFileRepository } from './blog.repository';

export class BlogService {
    blogRepository: BlogRepository;

    constructor() {
        this.blogRepository = new BlogFileRepository();
    }

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
