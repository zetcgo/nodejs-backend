const http = require('http');

let count = 0;
const server = http.createServer((req, res) => {
    console.log(++count);
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello\n');
    setTimeout(() => res.end('Node.js!'), 2000);
});

server.listen(3000);
