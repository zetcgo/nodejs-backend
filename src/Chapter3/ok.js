import http from 'http';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('OK');
});
server.listen(3000, () => console.log('Server is running on http://localhost:3000'));
