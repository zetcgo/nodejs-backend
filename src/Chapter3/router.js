const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'text/html');
    if (path in routeHandlers) routeHandlers[path](req, res);
    else handleNotFound(req, res);
}).listen(3000, () => console.log('Server is running on http://localhost:3000'));

const handleUserPage = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

const handleFeedPage = (req, res) =>
    res.end(`
    <ul>
        <li>Picture1</li>
        <li>Picture2</li>
        <li>Picture3</li>
    </ul>
`);

const handleNotFound = (req, res) => {
    res.statusCode = 404;
    res.end('404 Not Found');
};

const routeHandlers = {
    '/': (req, res) => res.end('HOME'),
    '/user': handleUserPage,
    '/feed': handleFeedPage,
};
