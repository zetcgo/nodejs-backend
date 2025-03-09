const { WebSocketServer } = require('ws');
const server = new WebSocketServer({ port: 3000 });

server.on('connection', (ws) => {
    console.log('Server opened');
    ws.send('Connected to server');
    ws.on('message', (message) => ws.send(`Message sent: ${message}`));
    ws.on('close', () => console.log('Server closed'));
});
