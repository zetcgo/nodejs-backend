import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDto } from './blog.model';
import { Blog, BlogDocument } from './blog.schema';

export type BlogRepository = {
    getArticles: () => Promise<Blog[]>;
    createArticle: (article: Blog) => Promise<void>;
    getArticle: (id: string) => Promise<Blog>;
    updateArticle: (id: string, article: Blog) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;
};

@Injectable()
export class BlogMongoRepository implements BlogRepository {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    async getArticles(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }

    async createArticle(blog: BlogDto): Promise<void> {
        await this.blogModel.create({ ...blog, createdAt: new Date() });
    }

    async getArticle(_id: string): Promise<Blog> {
        return await this.blogModel.findOne({ _id }).exec();
    }

    async updateArticle(_id: string, blog: BlogDto): Promise<void> {
        await this.blogModel.updateOne({ _id }, { _id, ...blog, updatedAt: new Date() });
    }

    async deleteArticle(_id: string): Promise<void> {
        await this.blogModel.deleteOne({ _id }).exec();
    }
}
