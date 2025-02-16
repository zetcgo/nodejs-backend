const url = require('url');
const express = require('express');

const app = express();
const port = 3000;

const handleUserPage = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.json(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

const handleFeedPage = (req, res) =>
    res.json(`
    <ul>
        <li>Picture 1</li>
        <li>Picture 2</li>
        <li>Picture 3</li>
    </ul>
`);

app.get('/', (req, res) => res.end('HOME'));
app.get('/user', handleUserPage);
app.get('/feed', handleFeedPage);

app.listen(port, () => console.log('Server is running on http://localhost:3000'));
