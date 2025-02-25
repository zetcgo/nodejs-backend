// @ts-check

const Paginator = require('../utils/Paginator');
const { ObjectId } = require('mongodb');

/**
 * @typedef {import('mongodb').Collection} Collection
 * @typedef {import('mongodb').Document} Document
 * @typedef {import('mongodb').WithId} WithId
 * @typedef {import('mongodb').ObjectId} ObjectId
 * @typedef {import('mongodb').InsertOneResult} InsertOneResult
 * @typedef {import('mongodb').UpdateResult} UpdateResult
 *
 * @typedef Comment
 * @extends WithId
 * @prop {number} id
 * @prop {string} commenter
 * @prop {string} password
 * @prop {string} content
 * @prop {Date} createdAt
 *
 * @typedef SafeArticle
 * @extends WithId
 * @prop {string} title
 * @prop {string} author
 * @prop {string} content
 * @prop {number} hits
 * @prop {Comment[]} comments
 * @prop {Date} createdAt
 *
 * @typedef Article
 * @extends SafeArticle
 * @prop {string} password
 */

module.exports = class ArticleService {
    /**
     * @param {Collection<Article>} [collection]
     */
    constructor(collection) {
        this._collection = collection;
    }

    set collection(collection) {
        this._collection = collection;
    }

    /**
     * @param {string} input
     * @param {number} page
     * @returns {Promise<[SafeArticle[], Paginator]>}
     */
    async paginateArticles(input = '', page = 1) {
        const ARTICLES_PER_PAGE = 20;
        const totalArticleCount = await this._collection.count({ title: new RegExp(input, 'i') });
        const paginator = new Paginator(totalArticleCount, ARTICLES_PER_PAGE, page);
        const articles = await this._collection
            .find({ title: new RegExp(input, 'i') }, { projection: { password: false } })
            .skip((page - 1) * ARTICLES_PER_PAGE)
            .limit(ARTICLES_PER_PAGE)
            .sort({ createdAt: -1 })
            .toArray();
        return [articles, paginator];
    }

    /**
     * @param {string} id
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    async checkPassword(id, password) {
        const article = await this._collection.findOne({ _id: new ObjectId(id) });
        return article.password === password;
    }

    /**
     * @param {string} id
     * @returns {Promise<Article>}
     */
    async getArticle(id) {
        return await this._collection.findOne({ _id: new ObjectId(id) });
    }

    /**
     * @param {string} id
     * @returns {Promise<SafeArticle>}
     */
    async readArticle(id) {
        return await this._collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { hits: 1 } },
            {
                projection: { password: false },
                returnDocument: 'after',
            },
        );
    }

    /**
     * @param {Article} article
     * @returns {Promise<InsertOneResult<Article>>}
     */
    async writeArticle(article) {
        article.hits = 0;
        article.comments = [];
        article.createdAt = new Date();
        return await this._collection.insertOne(article);
    }

    /**
     * @param {string} id
     * @param {Article} article
     * @returns {Promise<UpdateResult<Article>>}
     */
    async modifyArticle(id, article) {
        return await this._collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...article, hits: 0 } },
        );
    }

    /**
     * @param {string} id
     * @returns {Promise<DeleteResult>}
     */
    async deleteArticle(id) {
        return await this._collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * @param {id} id
     * @param {Comment} comment
     * @returns {Promise<UpdateResult<Document>>}
     */
    async writeComment(id, comment) {
        comment._id = new ObjectId();
        comment.createdAt = new Date();
        return await this._collection.updateOne(
            { _id: new ObjectId(id) },
            { $push: { comments: comment } },
        );
    }

    /**
     * @param {string} id
     * @param {string} commentId
     * @returns {Promise<UpdateResult<Document>>}
     */
    async deleteComment(id, commentId) {
        return await this._collection.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { comments: { _id: new ObjectId(commentId) } } },
        );
    }
};
