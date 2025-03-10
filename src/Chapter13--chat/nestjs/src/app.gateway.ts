import { Server, Socket } from 'socket.io';
import {
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('message')
    handleMessage(socket: Socket, data: { username: string; message: string }) {
        this.server.emit(
            'message',
            `${data.username}(${socket.id.substring(0, 6)}): ${data.message}`,
        );
    }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection {
    rooms: string[] = [];
    @WebSocketServer() server: Server;

    constructor(private readonly chatGateway: ChatGateway) {}

    handleConnection(socket: Socket) {
        socket.emit('rooms', this.rooms);
    }

    @SubscribeMessage('message')
    handleMessageToRoom(socket: Socket, data: { username: string; room: string; message: string }) {
        const result = `${data.username}(${socket.id.substring(0, 6)}): ${data.message}`;
        socket.to(data.room).emit('message', result);
        return result;
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(socket: Socket, data: { username: string; room: string }) {
        if (this.rooms.includes(data.room)) return false;
        this.rooms.push(data.room);
        this.chatGateway.server.emit(
            'notify',
            `User ${data.username}(${socket.id.substring(0, 6)}) created Room ${data.room}.`,
        );
        this.server.emit('rooms', this.rooms);
        return true;
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(socket: Socket, data: { username: string; from: string; to: string }) {
        await socket.leave(data.from);
        await socket.join(data.to);
        this.chatGateway.server.emit(
            'notify',
            `User ${data.username}(${socket.id.substring(0, 6)}) joined Room ${data.to}` +
                (data.from && ` from Room ${data.from}`),
        );
    }
}
