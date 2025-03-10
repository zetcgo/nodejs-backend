import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';

const chatSocket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');

let username = null;
let currentRoom = '';

const notify = (message) => {
    document.querySelector('.notification__message').innerHTML = message;
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification';
    notificationElement.innerHTML = `<i class="notification__icon fa-solid fa-bullhorn"></i>${message}`;
    document.body.appendChild(notificationElement);
    setTimeout(() => (notificationElement.style.top = '2rem'), 0);
    setTimeout(() => (notificationElement.style.top = '-90px'), 3000);
    setTimeout(() => notificationElement.remove(), 3500);
};
const pushChat = (message) => {
    const chatsElement = document.querySelector('.chats');
    if (chatsElement.children.length > 0) {
        const separatorElement = document.createElement('div');
        separatorElement.className = 'chat-separator';
        chatsElement.appendChild(separatorElement);
    }
    const chatElement = document.createElement('li');
    chatElement.innerText = message;
    chatElement.className = 'chat';
    chatsElement.appendChild(chatElement);
};

document.querySelector('.username-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (username) return;
    const inputElement = document.querySelector('.username-form__input');
    const buttonElement = document.querySelector('.username-form__submit');
    inputElement.disabled = true;
    buttonElement.disabled = true;
    buttonElement.innerHTML = '<i class="fa-solid fa-user"></i>';
    document.querySelector('.main').style.display = 'grid';
    username = inputElement.value;
});
document.querySelector('.room-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputElement = document.querySelector('.room-form__input');
    roomSocket.emit('createRoom', { username, room: inputElement.value }, (res) =>
        res ? (inputElement.value = '') : notify('Such room already exists.'),
    );
    inputElement.focus();
});
document.querySelector('.chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentRoom) {
        const inputElement = document.querySelector('.chat-form__input');
        roomSocket.emit(
            'message',
            { username, room: currentRoom, message: inputElement.value },
            (res) => pushChat(res),
        );
        inputElement.value = '';
        inputElement.focus();
    } else notify('Choose a room first to chat.');
});

chatSocket.on('notify', (message) => notify(message));
roomSocket.on('message', (message) => pushChat(message));
roomSocket.on('rooms', (rooms) => {
    const roomsElement = document.querySelector('.rooms');
    roomsElement.innerHTML = '';
    rooms.forEach((room, index) => {
        if (index > 0) {
            const separatorElement = document.createElement('div');
            separatorElement.className = 'room-separator';
            document.querySelector('.rooms').appendChild(separatorElement);
        }
        const roomElement = document.createElement('li');
        roomElement.className = 'room';
        roomElement.innerText = room;
        const joinButtonElement = document.createElement('button');
        joinButtonElement.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
        joinButtonElement.className = 'room__join';
        joinButtonElement.addEventListener('click', () => {
            document.querySelectorAll('.room__join').forEach((button) => (button.disabled = false));
            joinButtonElement.disabled = true;
            roomSocket.emit('joinRoom', { username, from: currentRoom, to: room });
            document.querySelector('.chats').innerHTML = '';
            currentRoom = room;
        });
        roomElement.appendChild(joinButtonElement);
        roomsElement.appendChild(roomElement);
    });
});
