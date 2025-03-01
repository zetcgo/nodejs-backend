import { Article } from './blog.model';

export class BlogService {
    blogs: Article[] = [];
    createdCount = 0;

    getArticles() {
        return this.blogs;
    }

    createArticle(article: Article) {
        this.blogs.push({ id: `${++this.createdCount}`, ...article, createdAt: new Date() });
    }

    getArticle(id: string) {
        return this.blogs.find((article) => article.id === id);
    }

    updateArticle(id: string, article: Article) {
        this.blogs[this.blogs.findIndex((article) => article.id === id)] = {
            id,
            ...article,
            updatedAt: new Date(),
        };
    }

    deleteArticle(id: string) {
        this.blogs = this.blogs.filter((article) => article.id !== id);
    }
}
