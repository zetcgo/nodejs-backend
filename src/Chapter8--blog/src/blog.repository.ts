import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { Article } from './blog.model';

export type BlogRepository = {
    getArticles: () => Promise<Article[]>;
    createArticle: (article: Article) => Promise<void>;
    getArticle: (id: string) => Promise<Article>;
    updateArticle: (id: string, article: Article) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;
};

@Injectable()
export class BlogFileRepository implements BlogRepository {
    static FILE_NAME = './src/blog.data.json';
    writtenCount = 0;

    async getArticles(): Promise<Article[]> {
        const data = await readFile(BlogFileRepository.FILE_NAME, 'utf-8');
        return JSON.parse(data) as Article[];
    }

    async createArticle(article: Article): Promise<void> {
        const posts = await this.getArticles();
        posts.push({ id: `${++this.writtenCount}`, ...article, createdAt: new Date() });
        await writeFile(BlogFileRepository.FILE_NAME, JSON.stringify(posts), 'utf-8');
    }

    async getArticle(id: string): Promise<Article> {
        const posts = await this.getArticles();
        return posts.find((article) => article.id === id);
    }

    async updateArticle(id: string, article: Article): Promise<void> {
        const posts = await this.getArticles();
        posts[posts.findIndex((article) => article.id === id)] = {
            id,
            ...article,
            updatedAt: new Date(),
        };
        await writeFile(BlogFileRepository.FILE_NAME, JSON.stringify(posts), 'utf-8');
    }

    async deleteArticle(id: string): Promise<void> {
        const posts = await this.getArticles();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(BlogFileRepository.FILE_NAME, JSON.stringify(filteredPosts), 'utf-8');
    }
}
