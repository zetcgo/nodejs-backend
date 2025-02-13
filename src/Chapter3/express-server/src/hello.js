import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.end('Hello, Express!');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
