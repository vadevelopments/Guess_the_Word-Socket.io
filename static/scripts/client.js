document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    let name = prompt('What is your name?');
    while (!name) {
        name = prompt('Please enter a valid name.');
    }
  
    socket.emit('submitUsername', { username: name });
  
    const chatBox = document.getElementById('chatBox');
    const messageInput = document.getElementById('messageInput');
    const messageForm = document.getElementById('messageForm');
  
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('chatMessage', message);
            messageInput.value = '';
        }
    });
  
    socket.on('chatMessage', (data) => {
        const message = document.createElement('p');
        message.innerText = `${data.name}: ${data.message}`;
        chatBox.appendChild(message);
    });
  
    socket.on('userJoined', (data) => {
        const message = document.createElement('p');
        message.innerText = `${data.name} has joined the game.`;
        chatBox.appendChild(message);
    });
  
    socket.on('userLeft', (data) => {
        const message = document.createElement('p');
        message.innerText = `${data.name} has left the game.`;
        chatBox.appendChild(message);
    });
  
    socket.on('chatHistory', (data) => {
        for (const item of data.chatHistory) {
            const message = document.createElement('p');
            message.innerText = `${item.name}: ${item.message}`;
            if (/won/.test(item.message)) { //checks if the item.message string contains the word "won". 
                message.style.color = "rgb(30, 231, 12)";
            }
            chatBox.appendChild(message);
        }
    });

    socket.on('gameOver', (data) => {
        const message = document.createElement('p');
        message.style.color = "rgb(30, 231, 12)";
        message.innerText = `${data.name}: ${data.message}`;
        chatBox.appendChild(message);
    });
});
  