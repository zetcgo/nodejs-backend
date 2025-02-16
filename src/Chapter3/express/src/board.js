// @ts-check

const express = require('express');

const app = express();

/**
 * Post
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {string} userName
 * @property {string} content
 * @property {Date} createdDate
 */

/**
 * Posts
 * @type {Post[]}
 */
let posts = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json(posts));
app.post('/posts', (req, res) => {
    const { title, userName, content } = req.body;
    posts.push({ id: posts.length + 1, title, userName, content, createdDate: new Date() });
    res.json({ title, userName, content });
});
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (posts.filter((post) => post.id !== id).length < posts.length) {
        posts = posts.filter((post) => post.id !== id);
        res.json('OK');
    } else res.json('NO CHANGE');
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
