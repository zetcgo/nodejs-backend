const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const connectMongoClient = require('./configs/mongodb');
const articleService = new (require('./services/ArticleService'))();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const { input, page } = req.query;
    try {
        const [articles, paginator] = await articleService.paginateArticles(input, page);
        res.render('home', { articles, input, paginator });
    } catch (e) {
        console.error(e);
    }
});

app.get('/write', (req, res) => {
    res.render('write', { mode: 'write' });
});

app.get('/:id', async (req, res) => {
    const article = await articleService.readArticle(req.params.id);
    res.render('article', { article });
});

app.post('/', async (req, res) => {
    const article = req.body;
    const result = await articleService.writeArticle(article);
    res.redirect(`/${result.insertedId}`);
});

app.post('/modify/:id', async (req, res) => {
    const id = req.params.id;
    const password = req.body.password;

    if (await articleService.checkPassword(id, password)) {
        const article = await articleService.getArticle(id);
        res.render('write', { mode: 'modify', article });
    } else {
        res.render('verify', { id, action: 'modify', error: password && 'Incorrect Password' });
    }
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const article = req.body;
    await articleService.modifyArticle(id, article);
    res.redirect(`/${id}`);
});

app.get('/modify/:id', async (req, res) => {
    res.render('verify', { href: `/modify/${req.params.id}` });
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await articleService.deleteArticle(id);
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    res.render('verify', { href: `/${req.params.id}?_method=DELETE` });
});

app.post('/:id', async (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    await articleService.writeComment(id, comment);
    res.redirect(`/${id}`);
});

app.get('/delete/:id/:commentId', async (req, res) => {
    res.render('verify', { href: `/${req.params.id}/${req.params.commentId}?_method=DELETE` });
});

app.delete('/:id/:commentId', async (req, res) => {
    const id = req.params.id;
    const commentId = req.params.commentId;
    await articleService.deleteComment(id, commentId);
    res.redirect(`/${id}`);
});

app.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
    const mongoClient = await connectMongoClient();
    articleService.collection = mongoClient.db('board').collection('articles');
    console.log('Successfully connected to MongoDB');
});
