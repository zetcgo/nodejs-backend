const socket = new WebSocket('ws://localhost:3000');

document.querySelector('.chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    socket.send(document.querySelector('.chat-form__input').value);
    document.querySelector('.chat-form__input').value = '';
});
document.querySelector('.chat-form__quit').addEventListener('click', () => socket.close());

let hasChat = false;
const pushChat = (message) => {
    if (hasChat) {
        const separatorElement = document.createElement('div');
        separatorElement.className = 'chat-separator';
        document.querySelector('.chats').appendChild(separatorElement);
    }
    const chatElement = document.createElement('li');
    chatElement.innerText = message;
    chatElement.className = 'chat';
    document.querySelector('.chats').appendChild(chatElement);
    hasChat = true;
};

socket.onmessage = (e) => pushChat(e.data);
socket.onclose = () => pushChat('Disconnected from server');
